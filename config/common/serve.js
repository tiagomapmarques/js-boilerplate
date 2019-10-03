const { serve } = require('./add-server');

const [, , port, open, spa] = process.argv;

const parsedOptions = {
  port: port || 8000,
  open: open ? open === 'true' : true,
  spa: spa ? spa === 'true' : true,
};

// eslint-disable-next-line no-console
console.log(parsedOptions);

serve(parsedOptions.port, parsedOptions.open, parsedOptions.spa);
