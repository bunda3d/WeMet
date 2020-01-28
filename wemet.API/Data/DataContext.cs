using Microsoft.EntityFrameworkCore;
using wemet.API.Models;

namespace wemet.API.Data
{
  public class DataContext : DbContext
  {
    //constructor, to be a consumable srvc
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    // Value is type of DbSet, "Values" will be table name 
    public DbSet<Value> Values { get; set;}
    //Users table for auth, hash & salt byte arrays

    public DbSet<User> Users { get; set; }

  }
}