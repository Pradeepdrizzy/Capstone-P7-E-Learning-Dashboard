using ElearnApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ElearnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _context.Users.Select(u => new
            {
                u.UserId,
                FullName = $"{u.FirstName} {u.LastName}",
                u.Email
            }).ToList();

            return Ok(users);
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _context.Users
                .Where(u => u.UserId == id)
                .Select(u => new
                {
                    u.UserId,
                    FullName = $"{u.FirstName} {u.LastName}",
                    u.Email
                })
                .FirstOrDefault();

            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }
    }
}
