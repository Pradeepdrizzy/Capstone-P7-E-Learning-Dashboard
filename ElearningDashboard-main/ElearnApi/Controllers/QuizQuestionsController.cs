using ElearnApi.Models;
using ElearnAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElearnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizQuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuizQuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/QuizQuestions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuizQuestion>>> GetQuizQuestions()
        {
            return await _context.QuizQuestions.ToListAsync();
        }

        [HttpGet("quizquestions/{courseId}")]
        public async Task<IActionResult> GetQuizQuestions(int courseId)
        {
            var questions = await _context.QuizQuestions
                                          .Where(q => q.CourseId == courseId)
                                          .ToListAsync();
            if (questions == null || !questions.Any())
            {
                return NotFound("No quiz questions found for this course.");
            }
            return Ok(questions);
        }


        // GET: api/QuizQuestions/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<QuizQuestion>> GetQuizQuestion(int id)
        {
            var quizQuestion = await _context.QuizQuestions.FindAsync(id);

            if (quizQuestion == null)
            {
                return NotFound();
            }

            return quizQuestion;
        }

        // POST: api/QuizQuestions
        [HttpPost]
        public async Task<ActionResult<QuizQuestion>> PostQuizQuestion(QuizQuestion quizQuestion)
        {
            _context.QuizQuestions.Add(quizQuestion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuizQuestion), new { id = quizQuestion.QuestionId }, quizQuestion);
        }

        // PUT: api/QuizQuestions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuizQuestion(int id, QuizQuestion quizQuestion)
        {
            if (id != quizQuestion.QuestionId)
            {
                return BadRequest();
            }

            _context.Entry(quizQuestion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.QuizQuestions.Any(q => q.QuestionId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/QuizQuestions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuizQuestion(int id)
        {
            var quizQuestion = await _context.QuizQuestions.FindAsync(id);
            if (quizQuestion == null)
            {
                return NotFound();
            }

            _context.QuizQuestions.Remove(quizQuestion);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
