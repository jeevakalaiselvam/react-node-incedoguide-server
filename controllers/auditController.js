const db = require('../config/database');
const { INCEDOGUIDE_ROLES } = require('../constants/incedoguideConstants');
const Audit = require('../models/Audit');

exports.markGuideComplete = async (req, res) => {
  try {
    const { projectId, guideId, userId } = req.body;
    const alreadyPresent = await Audit.findOne({
      where: { projectId, guideId, userId },
    });
    if (alreadyPresent !== null) {
      const previousVisitCount = alreadyPresent.visitCount;
      const updatedAudit = await Audit.update(
        {
          visitCount: +previousVisitCount + 1,
        },
        { where: { projectId, guideId, userId } }
      );
      if (updatedAudit !== null) {
        res.status(200).json({ status: 'success' });
      } else {
        res.status(500).json({
          status: 'fail',
          error: error,
        });
      }
    } else {
      const auditRecord = await Audit.create({
        projectId,
        guideId,
        userId,
        visitCount: 1,
      });
      if (auditRecord !== null) {
        res.status(200).json({ status: 'success' });
      } else {
        res.status(500).json({
          status: 'fail',
          error: error,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      error: error,
    });
  }
};
