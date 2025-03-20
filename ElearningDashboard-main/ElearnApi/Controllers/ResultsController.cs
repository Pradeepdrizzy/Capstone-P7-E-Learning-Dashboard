using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElearnDB.Models;
using ElearnApi.Models;

namespace ElearnDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResultsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Results
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Result>>> GetResults()
        {
            return await _context.Results.ToListAsync();
        }

        // GET: api/Results/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Result>> GetResult(int id)
        {
            var result = await _context.Results.FindAsync(id);

            if (result == null)
            {
                return NotFound("Result not found.");
            }

            return result;
        }

        // POST: api/Results
        [HttpPost]
        public async Task<IActionResult> SubmitQuizResults([FromBody] List<Result> results)
        {
            if (results == null || !results.Any())
                return BadRequest("No quiz data provided.");

            foreach (var result in results)
            {
                var quizResult = new Result
                {
                    UserId = result.UserId,
                    QuestionId = result.QuestionId,
                    OptionSelected = result.OptionSelected
                    //  Do NOT include `ResultId` here
                };

                _context.Results.Add(quizResult);
            }

            await _context.SaveChangesAsync();
            return Ok("Quiz results submitted successfully!");
        }

        [HttpGet("top-performers/{courseId}")]
        public async Task<IActionResult> GetTopPerformers(int courseId)
        {
            var topPerformers = await _context.Results
                .Where(r => _context.QuizQuestions
                    .Where(q => q.CourseId == courseId)
                    .Select(q => q.QuestionId)
                    .Contains(r.QuestionId))
                .GroupBy(r => r.UserId)
                .Select(group => new
                {
                    UserId = group.Key,
                    CorrectAnswers = group.Count(result => _context.QuizQuestions
                        .Any(q => q.QuestionId == result.QuestionId && q.Answer == result.OptionSelected))
                })
                .OrderByDescending(p => p.CorrectAnswers)
                .Take(5)
                .ToListAsync();

            return Ok(topPerformers);
        }
        [HttpGet("course-scores/{courseId}")]
        public async Task<IActionResult> GetCourseScores(int courseId)
        {
            // Fetch total number of questions for this course
            var totalQuestions = await _context.QuizQuestions
                .Where(q => q.CourseId == courseId)
                .CountAsync();

            // Fetch user scores
            var userScores = await _context.Results
                .Join(_context.QuizQuestions,
                      result => result.QuestionId,
                      question => question.QuestionId,
                      (result, question) => new { result, question })
                .Where(x => x.question.CourseId == courseId)
                .Join(_context.Users,
                      combined => combined.result.UserId,
                      user => user.UserId,
                      (combined, user) => new
                      {
                          UserId = user.UserId,
                          FullName = user.FirstName + " " + user.LastName,
                          IsCorrect = combined.result.OptionSelected == combined.question.Answer
                      })
                .GroupBy(x => new { x.UserId, x.FullName })
                .Select(group => new
                {
                    UserId = group.Key.UserId,
                    FullName = group.Key.FullName,
                    CorrectAnswers = group.Count(x => x.IsCorrect),
                    WrongAnswers = totalQuestions - group.Count(x => x.IsCorrect)
                })
                .ToListAsync();

            // Fetch course title
            var courseTitle = await _context.Courses
                .Where(c => c.CourseId == courseId)
                .Select(c => c.CourseName)
                .FirstOrDefaultAsync();

            return Ok(new
            {
                CourseTitle = courseTitle,
                Scores = userScores
            });
        }


        [HttpGet("correct-answers")]
        public async Task<IActionResult> GetCorrectAnswers()
        {
            var results = await (from result in _context.Results
                                 join question in _context.QuizQuestions
                                 on result.QuestionId equals question.QuestionId
                                 where result.OptionSelected == question.Answer
                                 group result by result.UserId into userGroup
                                 select new
                                 {
                                     UserId = userGroup.Key,
                                     CorrectAnswers = userGroup.Count()
                                 }).ToListAsync();

            return Ok(results);
        }



        // PUT: api/Results/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResult(int id, Result result)
        {
            if (id != result.ResultId)
            {
                return BadRequest("Result ID mismatch.");
            }

            _context.Entry(result).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Results.Any(e => e.ResultId == id))
                {
                    return NotFound("Result not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Results/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResult(int id)
        {
            var result = await _context.Results.FindAsync(id);
            if (result == null)
            {
                return NotFound("Result not found.");
            }

            _context.Results.Remove(result);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
