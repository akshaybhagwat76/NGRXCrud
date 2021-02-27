using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TEST_API.Entities;

namespace TEST_API.Helper
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder option)
        {
            option.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
        }

        public DbSet<Users> users { get; set; }
    }
}
