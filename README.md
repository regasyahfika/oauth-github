# CodeDebugging

Code debugging built with NodeJs

<p align="left"><a href="https://refactory.id" target="_blank"><img width="200" src="https://refactory-id.s3.amazonaws.com/webassets-prod/public/assets/img/kits/Refactory-Logo001(black).png" width="400"></a></p>

## About this Project Nodejs Oauth Github

This is an example node application that implements Githubs OAuth2 API.

In order to run the application:

1. Register your new application on Github : https://github.com/settings/applications/new. In the "callback URL" field, enter "http://localhost:3000/oauth-github-callback". Once you register, you will get a client ID and client secret.
2. Replace the values of the `CLIENT_ID`, `CLIENT_SECRET`, `OAUTH_URL`, `API_URL` in the [.env](.env) file
3. Install dependencies by executing: `npm install` or `yarn`.
4. Navigate to http://localhost:3000 on your browser.

Note: Documentation github Oauth https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps

## Contact

This project is so far away from perfect.
if any suggestion , feel free to contact me at:

- **[Email](mailto:rega.syahfika@gmail.com)**
- **[Facebook](https://facebook.com/rega.syahfika)**
- **[Linkedin](https://www.linkedin.com/in/regasyahfika)**

## Explanation of error analysis results

1. Pada file env yang seharusnya penggunaan file name yang benar yaitu .env karena penggunaan dependencies dotenv pada package.json

2. Pada file index.js terdapat `const envFound = dotenv.config();` yang seharusnya di tempatkan di bagian atas variable config karena terdapat penggunaan `process.env`. Setelah itu dibagian `module.exports = { config };` seharusnya cukup dengan `module.exports = config;` karena ketika export data config tidak ada penambahan object di dalamnya.

3. Pada file [authService.js](authService.js) terdapat code

   - yang seharusnya pada url api github untuk redirect terdapat parameter tambahan seperti api callbacknya

   ```
        function redirectUri() {
            return `${config.oauthUrl}/authorize?client_id=${config.clientId}`;
        }
   ```

   ```
     function redirectUri() {
          return `${config.oauthUrl}/authorize?client_id=${config.clientId}&redirect_uri=http://localhost:3000/oauth-github-callback`;
     }
   ```

   - Untuk penggunaan nama `module.export` yang benar adalah `module.exports` hanya kekurangan `s` didalamnya.

4. Pada file [userInfoService.js](userInfoService.js) terdapat function untuk get user terdapat penambahan di async pada function dan await untuk fungsi axios. dan penambahan variable response setelah itu hasil dari get data user selanjutnya di return hasilnya. Untuk penggunaan nama `module.export` yang benar adalah `module.exports` hanya kekurangan `s` didalamnya.

   ```
   async function getUserInfo(token) {
           const response = await axios({
           method: "get",
           url: `${config.apiUrl}/users`,
           headers: {
           Authorization: "token " + token,
           },
       }).then((response) => {
           return response.data;
       });
       return response;
   }

   module.exports = { getUserInfo: getUserInfo };
   ```

5. Pada file [authCallbackService.js](authCallbackService.js),

   - penggunaan nama parameter res seharusnya `res` bukan `resp`.
     `.then((res) => resp.data["accessToken"])` yang benar adalah `.then((res) => res.data.access_token)`
   - untuk get data access_token pengunaan data berupa object dan key yang benar adalah access_token.
     `.then((res) => resp.data["accessToken"])` yang benar adalah `.then((res) => res.data.access_token)`
   - dibagian ini sedikit ada perubahan dan penambahan untuk get data user karena sebelumnya terdapat perubahan di function getUserInfo. dan sedikit tambahan seperti untuk get semua data users.

     ```
     const response = UserServices.getUserInfo(accessToken);
         response.then(function (user) {
             res.json({
             data: {
                 login: user[0].login,
                 githubId: user[0].id,
                 avatar: user[0].avatar_url,
                 email: user[0].email,
                 name: user[0].name,
                 location: user[0].location,
             },
             });

             // untuk get semua data
             // const array = user.map(function (value, index) {
             //   return value;
             // });
             // res.json({data : array});
         });
     ```
