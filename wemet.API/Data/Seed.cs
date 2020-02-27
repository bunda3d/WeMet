using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using wemet.API.Models;

namespace wemet.API.Data
{
  public class Seed
  {
    public static void SeedUsers(DataContext context)
    {
      if (!context.Users.Any())
			{
        var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
        var users = JsonConvert.DeserializeObject<List<User>>(userData);
				foreach (var user in users)
				{
          byte[] passwordhash, passwordSalt;
          CreatePasswordHash("passord", out passwordhash, out passwordSalt);

					user.PasswordHash = passwordhash;
          user.PasswordSalt = passwordSalt;
          user.Username = user.Username.ToLower();
          context.Users.Add(user);
        }
				
        context.SaveChanges();
      }
    }
		
    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512()) 
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }
  }
}