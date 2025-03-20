using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElearnApi.Models;

namespace ElearnApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseDetailsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CourseDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDetails>>> GetCourseDetails()
        {
            return await _context.CourseDetails.ToListAsync();
        }

        // GET: api/CourseDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDetails>> GetCourseDetail(int id)
        {
            var courseDetail = await _context.CourseDetails.FindAsync(id);

            if (courseDetail == null)
            {
                return NotFound();
            }

            return courseDetail;
        }

        // POST: api/CourseDetails
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CourseDetails>> PostCourseDetails(CourseDetails courseDetails)
        {
            _context.CourseDetails.Add(courseDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourseDetail", new { id = courseDetails.CourseId }, courseDetails);
        }

        // PUT: api/CourseDetails/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutCourseDetails(int id, CourseDetails courseDetails)
        {
            if (id != courseDetails.CourseId)
            {
                return BadRequest();
            }

            _context.Entry(courseDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseDetailsExists(id))
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

        // DELETE: api/CourseDetails/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCourseDetails(int id)
        {
            var courseDetails = await _context.CourseDetails.FindAsync(id);
            if (courseDetails == null)
            {
                return NotFound();
            }

            _context.CourseDetails.Remove(courseDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseDetailsExists(int id)
        {
            return _context.CourseDetails.Any(e => e.CourseId == id);
        }
    }
}
