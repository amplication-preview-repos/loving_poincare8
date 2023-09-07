/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateCarArgs } from "./CreateCarArgs";
import { UpdateCarArgs } from "./UpdateCarArgs";
import { DeleteCarArgs } from "./DeleteCarArgs";
import { CarCountArgs } from "./CarCountArgs";
import { CarFindManyArgs } from "./CarFindManyArgs";
import { CarFindUniqueArgs } from "./CarFindUniqueArgs";
import { Car } from "./Car";
import { CarService } from "../car.service";
@graphql.Resolver(() => Car)
export class CarResolverBase {
  constructor(protected readonly service: CarService) {}

  async _carsMeta(
    @graphql.Args() args: CarCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @graphql.Query(() => [Car])
  async cars(@graphql.Args() args: CarFindManyArgs): Promise<Car[]> {
    return this.service.findMany(args);
  }

  @graphql.Query(() => Car, { nullable: true })
  async car(@graphql.Args() args: CarFindUniqueArgs): Promise<Car | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => Car)
  async createCar(@graphql.Args() args: CreateCarArgs): Promise<Car> {
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Car)
  async updateCar(@graphql.Args() args: UpdateCarArgs): Promise<Car | null> {
    try {
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Car)
  async deleteCar(@graphql.Args() args: DeleteCarArgs): Promise<Car | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
