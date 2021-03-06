'use strict';

var IdVerify = function(config) {
  this.trader = config.trader;
  this.idRecord = {};
};

module.exports = IdVerify;

IdVerify.factory = function factory(config) {
  return new IdVerify(config);
};

IdVerify.prototype.addLicense = function addLicense(data) {
  this.idRecord.license = data;
  this.idRecord.documentType = 'driversLicenseNA';  // North American driver's license
};

// e.g., last 4 of SSN
IdVerify.prototype.addLicenseCode = function addLicenseCode(code) {
  this.idRecord.licenseCode = code;
};

IdVerify.prototype.addTransaction = function addTransaction(transaction) {
  this.idRecord.transaction = transaction;
};

IdVerify.prototype.verifyUser = function verifyUser(cb) {
  var idRecord = this.idRecord;

  if (!idRecord.license) return cb(new Error('idRecord is incomplete'));

  this.trader.verifyUser(idRecord, cb);
};

IdVerify.prototype.verifyTransaction = function verifyTransaction(cb) {
  var idRecord = this.idRecord;

  if (!idRecord.license || !idRecord.transaction)
      return cb(new Error('idRecord is incomplete'));

  this.trader.verifyTransaction(idRecord, cb);
};

IdVerify.prototype.reset = function reset() {
  this.idRecord = {};
};
