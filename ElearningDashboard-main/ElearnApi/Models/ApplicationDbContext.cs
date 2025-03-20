using ElearnAPI.Models;
using ElearnDB.Models;
using Microsoft.EntityFrameworkCore;

namespace ElearnApi.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseDetails> CourseDetails { get; set; }
        public DbSet<QuizQuestion> QuizQuestions { get; set; }
        public DbSet<Result> Results { get; set; }
        //public DbSet<Enrollment> Enrollments { get; set; }
        //public DbSet<Progress> Progress { get; set; }
        //public DbSet<QuizQuestion> QuizQuestions { get; set; }
        //public DbSet<Result> Results { get; set; }
        //public DbSet<Role> Roles { get; set; }
        //public DbSet<Status> Status { get; set; }
    }
}