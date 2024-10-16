// export const createDomain = async () => {
//   // db logic
// };

import DomainModel from "../modals/Domain";

// export const getDomainById = async (id) => {
//   // db logic
// };

// export const getDomains = async () => {
//   // db logic
// };

export const createDomain = async (CreateDomainDto: any) => {
  try {
    const domainObj = await DomainModel.create({ ...CreateDomainDto }); //...CreateDomainDto
    return domainObj.toJSON();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDomains = async () => {
  try {
    const domains = await DomainModel.find().where({ isActive: true }).exec();

    return {
      data: domains,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDomainById = async (id: string) => {
  try {
    let domain = await DomainModel.findOne({
      _id: id,
      isActive: true,
    });

    return {
      data: domain,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDomain = async (id: string) => {
  await DomainModel.findOneAndUpdate({ _id: id }, { isActive: false });
};

export const updateDomain = async (id: string, updateFields: any) => {
  const updatedDomain = await DomainModel.findOneAndUpdate(
    {
      _id: id,
      isActive: true,
    },
    {
      $set: updateFields,
    },
    { runValidators: true, new: true }
  );

  return updatedDomain?.toJSON();
};
