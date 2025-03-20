using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ElearnApi.Models;

namespace ElearnAPI.Models
{
    public class QuizQuestion
    {
        [Key]
        public int QuestionId { get; set; }

        [Required]
        [ForeignKey("Course")]
        public int CourseId { get; set; }

        [Required]
        public string Question { get; set; }

        [Required]
        public string OptionA { get; set; }

        [Required]
        public string OptionB { get; set; }

        [Required]
        public string OptionC { get; set; }

        [Required]
        public string OptionD { get; set; }

        [Required]
        public string Answer { get; set; }

        //// Navigation property
        //public Course Course { get; set; }
    }
}
