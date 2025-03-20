using System.ComponentModel.DataAnnotations;

namespace ElearnDB.Models
{
    public class Result
    {
        [Key]
        public int ResultId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int QuestionId { get; set; }

        [Required]
        [MaxLength(50)]
        public string OptionSelected { get; set; }
    }
}
