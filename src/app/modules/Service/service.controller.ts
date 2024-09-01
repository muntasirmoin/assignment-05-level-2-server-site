import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { serviceModel } from "./service.model";
import { serviceServices } from "./service.service";

const createService = catchAsync(async (req, res) => {
  const serviceData = req.body;

  const result = await serviceServices.createServiceIntoDB(serviceData);

  // const responseResult = await serviceModel.findById(result._id).select("-__v");
  const responseResult = await serviceModel.findById(result._id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service created successfully",
    data: responseResult,
  });
});
// get single service
const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await serviceServices.getSingleServiceFromDB(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  const responseResult = await serviceModel.findOne(result?._id).select("-__v");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service retrieved successfully",
    data: responseResult,
  });
});

// get all service
const getAllService = catchAsync(async (req, res) => {
  const result = await serviceServices.getAllServiceFromDb();
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

// update service

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...payload } = req.body;

  const result = await serviceServices.updateServiceFromDb(id, payload);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

//delete soft

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await serviceServices.deleteServiceData(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getSingleService,
  getAllService,
  updateService,
  deleteService,
};
