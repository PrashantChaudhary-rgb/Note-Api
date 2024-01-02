const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: err.message });
    }
  
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Invalid ID' });
    }
  
    if (err.message === 'Not Found') {
      return res.status(404).json({ error: 'Resource/ Id  not found' });
    }
  
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
module.exports =  errorHandler;


