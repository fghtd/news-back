import PostModel from "../models/post.js";

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Create post failed."
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user").exec();
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};

export const getOne = (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate(
            {
              _id: postId,
            },
            {
              $inc: { viewsCount: 1 },
            },
            {
              returnDocument: "after",
            }
          )
          .then((doc, err) => {

            if (err) {
              console.log(err);
              return res.status(500).json({
                message: "Can't get article.",
              });
            }

            if (!doc) {
              return res.status(404).json({
                message: "Article not found.",
              });
            }    

            res.json(doc);     
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};

export const remove = (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndDelete(
            {
              _id: postId,
            },
          )
          .then((doc, err) => {

            if (err) {
              console.log(err);
              return res.status(500).json({
                message: "Failed delete article.",
              });
            }

            if (!doc) {
              return res.status(404).json({
                message: "Something went wrong.",
              });
            }    
             
            res.json({
              message: "article deleted.",
              success: "true",
            });     
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      },
    );

    res.json({
      success: "true",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message: "Update article failed."
    });
  }
};
