import { Request, Response, NextFunction } from "express";

//TODO change this for import model
import products from "../../data/products";
import { async } from "../../middlewares/async";

class ProductControllerClass {
  public list = async(
    async (req: Request, res: Response, next: NextFunction) => {
      res.json(products);
    }
  );

  public show = async(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const product = products.find((product) => product._id === id);
      res.json(product);
    }
  );
}

export const ProductController = new ProductControllerClass();

export default ProductController;
