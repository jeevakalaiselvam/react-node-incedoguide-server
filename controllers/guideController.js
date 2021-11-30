const db = require('../config/database');
const { INCEDOGUIDE_ROLES } = require('../constants/incedoguideConstants');
const Guide = require('../models/Guide');
const { update } = require('../models/User');
const User = require('../models/User');

//Get all Admin Users for Incedo Guide
exports.getAllGuides = async (req, res) => {
  try {
    console.log('GETTING ALL GUIDES');
    const { projectId, identifier } = req.body;
    const allGuidesForProject = await Guide.findAll({
      where: { projectId: projectId, identifier: identifier },
      order: [['guideId', 'ASC']],
    });

    if (allGuidesForProject !== null) {
      res.status(200).json({
        status: 'success',
        guides: allGuidesForProject,
      });
    } else {
      res.status(500).json({
        status: 'fail',
        error,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
};

exports.addNewGuide = async (req, res) => {
  try {
    const { projectId, identifier, steps, title, roleVisibilityList } =
      req.body;
    const rolesForGuide = Object.keys(roleVisibilityList);
    const createdGuide = await Guide.create({
      projectId,
      identifier,
      steps,
      title,
      roleVisibility: rolesForGuide,
    });
    if (createdGuide !== null) {
      const allGuidesForProjectAndIdentifier = await Guide.findAll({
        where: { projectId: projectId, identifier: identifier },
        order: [['guideId', 'ASC']],
      });
      if (allGuidesForProjectAndIdentifier !== null) {
        res.status(200).json({
          status: 'success',
          guides: allGuidesForProjectAndIdentifier,
        });
      } else {
        res.status(200).json({
          status: 'success',
          guides: [],
        });
      }
    } else {
      res.status(500).json({
        status: 'fail',
        error,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
};

//Update Guide
exports.updateGuide = async (req, res) => {
  try {
    const { guide } = req.body;
    const { projectId, identifier, steps, title, guideId } = guide;
    const updatedGuide = await Guide.update(
      { projectId, identifier, steps, title },
      { where: { guideId: guideId } }
    );
    if (updatedGuide !== null) {
      const allGuides = await Guide.findAll({
        where: { projectId: projectId, identifier: identifier },
        order: [['guideId', 'ASC']],
      });
      if (allGuides !== null) {
        res.status(200).json({
          status: 'success',
          guides: allGuides,
        });
      } else {
        res.status(500).json({
          status: 'fail',
          error,
        });
      }
    } else {
      res.status(500).json({
        status: 'fail',
        error,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
};

//Delete Guides
exports.deleteGuides = async (req, res) => {
  try {
    const { guideIds, projectId, identifier } = req.body;
    console.log('GUIDE IDSSDASDASDAS', guideIds);
    const deletePromises = guideIds.map((guideId) => {
      return new Promise(async (resolve, reject) => {
        const deletedGuide = await Guide.destroy({
          where: {
            guideId,
            projectId,
          },
        });
        if (deletedGuide !== null) {
          resolve(deletedGuide);
        } else {
          reject(new Error('Error while deleting guide'));
        }
      });
    });
    Promise.all(deletePromises)
      .then(async (data) => {
        const allGuides = await Guide.findAll({
          where: {
            projectId,
          },
        });
        if (allGuides !== null) {
          res.status(200).json({
            status: 'succ',
            guides: allGuides,
          });
        } else {
          res.status(200).json({
            status: 'succ',
            guides: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: 'fail',
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
};

//Update Guide Roles
exports.updateGuideRoles = async (req, res) => {
  console.log('UPDATING GUIDE ROLES');
  try {
    const { projectId, rolesInGuides, identifier } = req.body;
    const updatePromises = Object.keys(rolesInGuides).map((guideId) => {
      return new Promise(async (resolve, reject) => {
        const updatedProject = await Guide.update(
          { roleVisibility: rolesInGuides[guideId] },
          { where: { guideId, projectId } }
        );
        if (updatedProject !== null) {
          resolve(updatedProject);
        } else {
          reject(new Error('Error updating Guide'));
        }
      });
    });
    Promise.all(updatePromises)
      .then((data) => {
        res.status(200).json({
          rolesInGuides,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 'fail',
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
};
