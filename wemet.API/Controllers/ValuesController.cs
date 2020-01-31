using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wemet.API.Data;
using Microsoft.AspNetCore.Authorization;

namespace wemet.API.Controllers
{
  //auth attribute->user must authenticate/be token bearer to use API
  [Authorize]
  [Route("api/[controller]")]
  [ApiController] 
  //CRUD app 
  public class ValuesController : ControllerBase
  {
    private readonly DataContext _context;
    public ValuesController(DataContext context)
    {
      _context = context;
    }
    //TEMPORARY FOR DEV: allow anonymous to get API valueS
    [AllowAnonymous]
    // GET api/values
    [HttpGet]
    //notice this is GetValue(s), plural, (a list)
    public async Task<IActionResult> GetValues()
    {
      var values = await _context.Values.ToListAsync();
      return Ok(values);
    }
    //allow anonymous to get single API value, but only authenticated token bearers can scrape stream
    [AllowAnonymous]
    // GET api/value/
    [HttpGet("{id}")]
    public async Task<IActionResult> GetValue(int id)
    {
      var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);

      return Ok(value);
    }

    // POST api/value
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/values/
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/values/
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}