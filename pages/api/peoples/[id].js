const database = { 1: { id: 1, name: "bonnie" } };

export default function userHandler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json(database[id]);
      break;
    // case "PUT":
    //   // Update or create data in your database
    //   res.status(200).json({ id, name: name || `User ${id}` });
    //   break;
    // default:
    //   res.setHeader("Allow", ["GET", "PUT"]);
    //   res.status(405).end(`Method ${method} Not Allowed`);
  }
}
