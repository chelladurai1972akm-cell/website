const marketerRepository = require("../repositories/marketerRepository");

exports.createCampaign = async (campaignData) => {
  return await marketerRepository.createCampaign(campaignData);
};

exports.getDashboard = async (marketerId) => {

const data = await marketerRepository.getMarketerDashboard(marketerId);

return {

totalCampaigns: Number(data.summary.totalCampaigns) || 0,
approved: Number(data.summary.approved) || 0,
pending: Number(data.summary.pending) || 0,
rejected: Number(data.summary.rejected) || 0,
expired: Number(data.summary.expired) || 0,

views: Number(data.summary.views) || 0,
clicks: Number(data.summary.clicks) || 0,
leads: Number(data.summary.leads) || 0,
conversions: Number(data.summary.conversions) || 0,
likes: Number(data.summary.likes) || 0,

campaigns: data.campaigns

};

};


exports.getMyCampaigns = async (marketerId) => {

const campaigns = await marketerRepository.getMyCampaigns(marketerId);

return campaigns;

};