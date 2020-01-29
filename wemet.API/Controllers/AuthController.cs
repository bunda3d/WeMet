using System.Text;
using System.Security.Claims;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using wemet.API.Data;
using wemet.API.Dtos;
using wemet.API.Models;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace wemet.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController] 
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository _repo;
    private readonly IConfiguration _config;
    //inject config into controller
    public AuthController(IAuthRepository repo, IConfiguration config)
    {
      _repo = repo;
      _config = config;
    }

    [HttpPost("register")]
    //register Data Transfer Object of both username and password together
    public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
      // validate request, see Dtos folder class to review validation hurdles and attributes
      userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

      //fail auth if username exists in db
      if (await _repo.UserExists(userForRegisterDto.Username))
        //fail, return 400 code
        return BadRequest("Username already exists");

      //create new username
      var userToCreate = new User
      {
        Username = userForRegisterDto.Username
      };

      //register username & password
      var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

      //successful register
      return StatusCode(201);
    }
    //log in and json token
    [HttpPost("login")]
    //login Data Transfer Object creation
    public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
    {
			//check name as lower case, like as registered in db repo
      var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

      if (userFromRepo == null)
      //don't want to give msg confirming username exists, so return vague 'Unauthorized' 
        return Unauthorized();

      //2 claims; id and username
			var claims = new[]
      {
        new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
        new Claim(ClaimTypes.Name, userFromRepo.Username)
      };

      //create key
			//will reuse key in multiple places, store key in AppSettings.json, similar to storing connection string
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

      //encrypt key as signing credentials of token
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      //create token by describing its features;
			var tokenDescriptor = new SecurityTokenDescriptor
      {
        //pass in claims
				Subject = new ClaimsIdentity(claims),      
				//create expiry; can add more days to make token period longer
        Expires = DateTime.Now.AddDays(14),
				//pass in credentials
        SigningCredentials = creds
      };

      //Json Web Token (so user doesn't have to login every visit)
      var tokenHandler = new JwtSecurityTokenHandler();
			//jwt handler allows token to be created from descriptor
      var token = tokenHandler.CreateToken(tokenDescriptor);

      //give user the token
			return Ok(new
      {
        token = tokenHandler.WriteToken(token)
      });
    }
  }
}