let config;

console.log(process.env);

switch (process.env.REACT_APP_ENV) {
    case('test') :
        config = {
            apiUrl: 'http://localhost:8008/'
        };
}

export default config;
