using Microsoft.VisualBasic.CompilerServices;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using wemet.API.Data;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace wemet.API
{
  public class Program
  {
    public static void Main(string[] args)
    {
      
      var host = CreateHostBuilder(args).Build();
      using (var scope = host.Services.CreateScope())
      {
        var services = scope.ServiceProvider;
        try
        {
          var context = services.GetRequiredService<DataContext>();
          // create db
          context.Database.Migrate();
          // seed first users from JSON file
          Seed.SeedUsers(context);
        }
        catch (Exception ex)
        {
          var logger = services.GetRequiredService<ILogger<Program>>();
          logger.LogError(ex, "An error occured during migration");
        }
      }

      host.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
      Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
          webBuilder.UseStartup<Startup>();
        });
  }
}
