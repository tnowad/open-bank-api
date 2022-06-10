import { Router, Request, Response, Express } from "express";

import app from "../app";
import listEndpoints, { Endpoint } from "express-list-endpoints";

interface EndpointNode extends Endpoint {
  path: string;
  methods: string[];
  middlewares: string[];
  children?: EndpointNode[];
}

const endpointRouter = Router();

endpointRouter.get("/", (req: Request, res: Response) => {
  const endpoints = listEndpoints(app.app as Express);

  const root: EndpointNode = {
    path: "/",
    methods: [],
    middlewares: [],
    children: [],
  };

  const addEndpointToTree = (
    tree: EndpointNode,
    pathParts: string[],
    endpoint: EndpointNode
  ) => {
    const [part, ...remainingParts] = pathParts;
    let child = tree.children?.find((node) => node.path === part);

    if (!child) {
      child = {
        path: part,
        methods: [],
        middlewares: [],
        children: [],
      };
      tree.children?.push(child);
    }

    if (remainingParts.length === 0) {
      child.methods = endpoint.methods;
      child.middlewares = endpoint.middlewares;
    } else {
      addEndpointToTree(child, remainingParts, endpoint);
    }
  };

  endpoints.forEach((endpoint) => {
    const pathParts = endpoint.path.split("/").filter((part) => part !== "");
    addEndpointToTree(root, pathParts, endpoint);
  });

  res.json(root);
});

export default endpointRouter;
