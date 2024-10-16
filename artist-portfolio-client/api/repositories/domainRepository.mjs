const DomainModel = require('../modals/Domain.js');

// export const createDomain = async () => {
//   // db logic
// };

// export const getDomainById = async (id) => {
//   // db logic
// };

// export const getDomains = async () => {
//   // db logic
// };

export const createDomain = async (CreateDomainDto) => {

  try {
    const domainObj = await DomainModel.create({ name: CreateDomainDto.name }); //...CreateDomainDto
    return domainObj.toJSON();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDomains = async () => {
  try {
    const domains = await DomainModel.find()
      .where({ isActive: true })
      .exec();

    return {
      data: domains,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDomainById = async (id) => {
  try {
    let domain = await DomainModel.findOne({
      _id: id,
      isActive: true
    });

    return {
      data: domain,
    };

  } catch (error) {

    console.error(error);
    throw error;

  }
};

export const deleteDomain = async (id) => {
  await DomainModel.findOneAndUpdate(
    { _id: id },
    { isActive: false }
  );
}

export const updateDomain = async (id, updateFields) => {
  const updatedDomain = await DomainModel.findOneAndUpdate({
    _id: id,
    isActive: true
  },
    {
      $set: updateFields
    },
    { runValidators: true , new: true }); 

  return updatedDomain.toJSON();
};