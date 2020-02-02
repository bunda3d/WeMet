using Microsoft.AspNetCore.Http;

namespace wemet.API.Helpers
{
	public static class Extensions
	{
		//error msg helpers
		public static void AddApplicationError(this HttpResponse response, string message)
		{
			// first response carries error msg, the other 2 help the first one connect and display
			response.Headers.Add("Application-Error", message);
			//expose CORS headers for Angular error diagnosis
			response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
			//allow to show origin when backend/frontend are different origins
			response.Headers.Add("Access-Control-Allow-Origin", "*");
		}
	}
}