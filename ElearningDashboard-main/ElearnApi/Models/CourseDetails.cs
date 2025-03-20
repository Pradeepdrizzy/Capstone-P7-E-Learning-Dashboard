using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElearnApi.Models
{
    [Table("CourseDetails")]
    public class CourseDetails
    {
        [Key]
        public int CourseId { get; set; }

        [Required]
        [MaxLength(int.MaxValue)] // Maximum possible length
        public string CourseName { get; set; }

        [MaxLength(int.MaxValue)] // Maximum possible length
        public string CourseDescription { get; set; }
    }
}
