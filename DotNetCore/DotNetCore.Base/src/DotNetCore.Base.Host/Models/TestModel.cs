namespace DotNetCore.Base.Host.Models
{
    public class TestModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Completed { get; set; }
        public long TicksBeforeActionFilter { get; set; }
        public long TicksAfterActionFilter { get; set; }
        public long TicksBeforeResultFilter { get; set; }
        public long TicksAfterResultFilter { get; set; }
    }
}