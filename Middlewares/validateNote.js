const validateNote = (req, res, next) => {
    const { title, content } = req.body;
  
    if (!title || title.length === 0 ) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (title.length > 40 ) {
      return res.status(400).json({ error: 'Title length cant exceed 40' });
    }
    if (!content || content.length === 0 ) {
      return res.status(400).json({ error: 'Content is required' });
    }
    if (content.length > 100) {
      return res.status(400).json({ error: 'Content length cant exceed 400' });
    }
    next();
  };
  
module.exports =  validateNote;