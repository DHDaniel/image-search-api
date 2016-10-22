# Image Search API
An API abstraction that searches for images, and returns simplified data based on the parameters passed.

## Parameters
Parameters are encoded as a URL query string. They can include:
- **q** : the query string (e.g "Funny Cat Pictures")
- **page** : the page number to look in (e.g page 1, 2, 3). *Defaults to 1 if omitted*.

An example call to the API would look like:
> host/api/search?q=funny%20cat&page=2

Where "host" is the host name where the application is running.

### Return values
The Image Search API returns an array of objects with up to 10 results. Each object includes the properties:
- **title** : the title text of the image
- **url** : the URL where the image is located
- **pageUrl** : the URL of the page where the image appears
- **thumbnail** : the URL of the image thumbnail

## Latest searches API
By hitting the url
> host/api/latest

the API returns an array of the 10 latest search queries, with their respective timestamp. "Host" is the hostname of where the app resides.
