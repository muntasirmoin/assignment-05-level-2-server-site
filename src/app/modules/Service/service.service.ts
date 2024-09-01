import { TService, TUpdateService } from "./service.interface";
import { serviceModel } from "./service.model";

// Create Service
const createServiceIntoDB = async (payload: TService) => {
  const result = await serviceModel.create(payload);
  return result;
};

// get single data by id
const getSingleServiceFromDB = async (_id: string) => {
  const result = await serviceModel.findById(_id);

  return result;
};

// get all data

const getAllServiceFromDb = async () => {
  const result = await serviceModel.find().select("-__v");
  return result;
};

// update service

const updateServiceFromDb = async (
  id: string,
  payload: Partial<TUpdateService>
) => {
  const modifiedUpdateData: Record<string, unknown> = {
    ...payload,
  };

  const result = await serviceModel.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

// soft delete
const deleteServiceData = async (_id: string) => {
  const deletedService = await serviceModel.findOneAndUpdate(
    { _id },
    { isDeleted: true },
    { new: true }
  );

  return deletedService;
};

export const serviceServices = {
  createServiceIntoDB,
  getSingleServiceFromDB,
  getAllServiceFromDb,
  updateServiceFromDb,
  deleteServiceData,
};
