const express = require('express');
const router = express.Router();

const job = require('../controllers/job.controller');

router.get('/', job.getJobs);
router.post('/', job.createJob);
router.get('/detail/:id', job.getJob);
router.put('/:id', job.editJob);
router.put('/detail/:id', job.usereditJob);
router.delete('/:id', job.deleteJob);
router.put('/status/:id', job.statusJob);
module.exports = router;