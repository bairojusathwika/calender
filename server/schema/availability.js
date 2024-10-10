const AvailabilitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dayOfWeek: { type: String, required: true }, 
    intervals: [
      {
        startTime: { type: String, required: true }, 
        endTime: { type: String, required: true }    
      }
    ]
  });
  