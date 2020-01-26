using Microsoft.EntityFrameworkCore;
using wemet.API.models;

namespace wemet.API.Data
{
  public class DataContext : DbContext
  {
    //constructor, to be a consumable srvc
    public DataContext(DbContextOptions<DataContext> options) : base(options){}
    // Value is type of DbSet, Values will be table name 
    public DbSet<Value> Values {get; set;}

  }
}