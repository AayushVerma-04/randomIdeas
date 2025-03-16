const express = require("express");

const router = express.Router();
const Idea = require("./models/Idea");

const ideas = [
  {
    id: 1,
    text: "Newsletter",
    tag: "TECHNOLOGY",
    username: "Me",
    date: "2022-01-12",
  },
  {
    id: 2,
    text: "Newsletter 2",
    tag: "TECHNOLOGY",
    username: "Me 2",
    date: "2022-01-09",
  },
  {
    id: 3,
    text: "Newsletter 3",
    tag: "FOOD",
    username: "Me 3",
    date: "2022-01-04",
  },
  {
    id: 4,
    text: "Newsletter 4",
    tag: "INVENTIONS",
    username: "Me 4",
    date: "2022-01-02",
  },
];

router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  const temp = req.body;
  const idea = new Idea({
    text: temp.text,
    tag: temp.tag,
    username: temp.username,
  });

  try {
    const savesIdea = await idea.save();
    res.json({ success: true, data: savesIdea });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        tag: req.body.tag,
      },
      { new: true } //if id not found, create new one
    );
    res.json({ success: true, data: idea });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data:[] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
