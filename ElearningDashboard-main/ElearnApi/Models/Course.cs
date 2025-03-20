using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace ElearnApi.Models
{
    public class Course
    {
        public int CourseId { get; set; }
        public string CourseName { get; set; }
    }
}
