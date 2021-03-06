/**
 * ProjectController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


/**
 * AuthController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


import * as fs from "fs"
import * as fsExtra from "fs-extra"
import { CoreController } from "./CoreController"

/* istanbul ignore next */
function walk(dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = dir + '/' + file;
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

declare var CollaborationService;
declare var GraphGeneratorService;
declare var User;
declare var Project;
declare var sails;
declare var Graph;

class ProjectController extends CoreController {

  /**
   * Shows the Project creation page
   */
  new(req, res) {
    this._handleRequest(req, res, (req, res, options) => {
      res.view({});
    })
  }

  setmyname(req, res) {
    this._handleRequest(req, res, (req, res, options) => {
      CollaborationService.setSocketName(req.socket, req.body);
      res.json("done");
    })
  }

  create(req, res, next) {
    this._handleRequest(req, res, (req, res, options) => {
      const userID = req.user.id;
      Project.create(req.params.all()).exec(function (err, created) {
        if (err) return next(err);
        if (!created) return next();
        created.members.add(userID);
        created.save(function foundUser(err, user) {
          var fsPath = sails.config.shusee.fsPath
          var directoryToCreate = fsPath + '/projects/' + created.id;
          if (err) return res.json(err);
          fs.mkdirSync(directoryToCreate);
          res.redirect("/project/show/" + created.id);
        });
        sails.log('Created project with name ' + created.name);
      });
    })
  }


  createdemo(req, res, next) {
    this._handleRequest(req, res, (req, res, options) => {
      Project.create({
        name: "public",
        visibility: "global"
      }).exec(function (err, created) {
        if (err) return next(err);
        var fsPath = sails.config.shusee.fsPath
        var directoryToCreate = fsPath + '/projects/' + created.id;
        fs.mkdirSync(directoryToCreate);

        Graph.create({ project: created.id, type: "root" }).exec(function (err, res2) {
          if (err) return next(err);
          GraphGeneratorService.addToGraph(res2.id, "curl -s http://get.docker.io/ubuntu/ | grep \"#\"", function (err, __) {
            if (err) return next(err);
            res.redirect("/project/play/" + created.id);
          });
        });
        sails.log('Created public project');
      });
    })
  }

  show(req, res, next) {
    this._handleRequest(req, res, (req, res, options) => {
      Project.findOne(req.param('id')).populate('members').exec(function (err, project) {
        if (err || !project) return next(err);
        res.view({
          project: project,
          members: project.members
        });
      });
    })
  }

  chat(req, res) {this._handleRequest(req, res, (req, res, options) => CollaborationService.chat(req, res))}

  addmember(req, res, next) {
    this._handleRequest(req, res, (req, res, options) => {
      Project.findOne(req.param('id'), function foundProject(err, project) {
        if (err) return next(err);
        if (!project) return next();
        User.findOne(req.param('memberId'), function foundUser(err, user) {
          if (err) return next(err);
          if (!user) return next();
          project.members.add(user.id);
          project.save(function foundUser(err, user) {
            if (err) res.json(err);
            else res.redirect("/project/show/" + project.id);
          });
        });
      });
    })
  }


  play(req, res, next) {
    this._handleRequest(req, res, (req, res, options) => {
      Project.findOne(req.param('id')).populate('members').exec(function (err, project) {
        if (err || !project) return next(err);
        if (project.visibility == "global") {
          res.view({
            locals: { project: true },
            project: project,
            members: project.members,
            layout: null
          });
        } else if (req.user) {
          var members = project.members;
          if (members.indexOf(req.user.id)) {
            res.view({
              locals: { project: true },
              project: project,
              members: project.members,
              layout: null
            });
          } else res.redirect("/project/show/" + project.id);
        } else {
          res.redirect("/project/show/" + project.id);
        }
      });
    })
  }


  subscribe(req, res, next) {
    this._handleRequest(req, res, (req, res, options) => {
      var id = req.param('id');

      Project.findOne(id).populate('members').populate('graphs').exec(function (err, project) {
        if (err || !project) return next(err);
        if (project.visibility == "global") {
          CollaborationService.joinUserToProject(req, res, project);
        } else if (!req.session.user) {
          res.json(500, { error: 'not logged id' });
        } else {
          var userId = req.user.id
          if (project.members.some(member => member.id == userId)) {
            CollaborationService.joinUserToProject(req, res, project);
          } else {
            res.json(404, { error: 'User not found' });
          }
        }
      });
    })
  }

  graphaction(req, res) {
    this._handleRequest(req, res, (req, res, options) => {
      CollaborationService.broadcastMessageInProject(req, res)
    })
  }


  showDir(req, res) {
    this._handleRequest(req, res, (req, res, options) => {
      var fsPath = sails.config.shusee.fsPath
      var savedDirectory = fsPath + '/projects/';
      var directoryToFind = savedDirectory + req.params.id;
      walk(directoryToFind, function (err, results) {
        var result = results.map(function (result) {
          return {
            name: result.slice(directoryToFind.length + 1),
            filename: result.replace(/^.*[\\\/]/, ''),
          }
        })
        res.json(result);
      })
    })
  }



  uploadfile(req, res) {
    this._handleRequest(req, res, (req, res, options) => {
      var fsPath = sails.config.shusee.fsPath
      var directoryToSave = fsPath + '/projects/' + req.params.id + "/";

      req.file('file').upload({ dirname: directoryToSave }, function onUploadComplete(err, uploadedFiles) {
        if (err) return res.serverError(err);

        return res.json({
          message: uploadedFiles.length + ' file(s) uploaded successfully!',
          files: uploadedFiles
        });
      });
    })
  }


  downloadfile(req, res) {
    this._handleRequest(req, res, (req, res, options) => {
      var fsPath = sails.config.shusee.fsPath
      var savedDirectory = fsPath + '/projects/';
      var directoryToFind = savedDirectory + req.params.id;
      var path = directoryToFind + '/' + req.params.path
      fs.exists(path, function (exists) {
        if (exists) {
          var filename = path.replace(/^.*[\\\/]/, '')
          res.download(path, filename);
        } else {
          res.notFound();
        }
      });
    })
  }


  viewfile(req, res) {
    this._handleRequest(req, res, (req, res, options) => {
      var fsPath = sails.config.shusee.fsPath
      var savedDirectory = fsPath + '/projects/';
      var directoryToFind = savedDirectory + req.params.id;
      var path = directoryToFind + '/' + req.params.path
      fs.exists(path, function (exists) {
        if (exists) {
          res.sendfile(path);
        } else {
          res.notFound();
        }
      });
    })
  }

}

module.exports = new ProjectController();

