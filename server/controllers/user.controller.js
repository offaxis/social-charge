import User from '../models/user';

export function getUsers(req, res) {
    User.find().sort('name').exec((err, users) => {
        if(err) {
            res.status(500).send(err);
        }
        res.json({users});
    })
  // return res.status(200).end();
}
