using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using wemet.API.Data;
using wemet.API.Dtos;
using wemet.API.Models;

namespace wemet.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController] 
  public class AuthController
  {
    private readonly IAuthRepository _repo;
    public AuthController(IAuthRepository repo)
    {
      _repo = repo;
    }
    [HttpPost("register")]
    public async Task<ActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
      // validate request

      userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

      if (await _repo.UserExists(userForRegisterDto.Username))
        return BadRequest("Username already exists");

      var userToCreate = new User 
      {
        Username = userForRegisterDto.Username
      };
      var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);
      //fix later to add CreatedAtRoute()
      return StatusCode(201);
      
    }
}