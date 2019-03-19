const BoardService = require("../services/BoardService");

/**
 * Creates a board.
 * @param {HTTPRequest} req, the request
 * @param {HTTPResponse} res, the response
 */
async function createBoard(req, res) {
    const board = await BoardService.createBoard(req.body.projectId, req.body.name);
    if (!req.body.projectId) {
        return res.status(401).json({ message: "Specify projectId" });
    }
    res.json({ message: "Created board!", board });
}

async function getAll(req, res) {
    if (!req.body.projectId) {
        return res.status(401).json({ message: "Specify projectId" });
    }
    const boards = await BoardService.getAll(req.body.projectId);

    res.json({ message: "Retrieved all boards of the project.", boards: boards });
}
module.exports = {
    createBoard, getAll
};
