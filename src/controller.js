'use strict';
const CurrencyModel = require('./model');

module.exports = {

  getAllByMarket(req, res) {
    const market = req.params["market"];
    CurrencyModel.find({market: market}, (err,result) => {
      if(err){
        return res.status(500).json(err);
      }
      return res.json(result);
	})
  },

  getAll(req, res) {
    CurrencyModel.find((err,result) => {
      if(err){
		console.log(err);
        return res.status(500).json(err);
      }
      return res.json(result);
    })
  },

  getOne(req, res) {
    const currencyID = req.params['currencyID'];
    CurrencyModel.find({ id: currencyID }, (err, result) => {
      if (err) {
		console.log(err);
        return res.status(500).json(err);
      }
      return res.json(result);
    });
  },

  create(req, res) {
    let currency = req.body;
    CurrencyModel.create(currency, (err, result) => {
      if (err) {
		console.log(err);
        return res.status(500).json(err);
      }
      return res.json(result);
    });
  },

  update(req,res) {
    const currencyId = req.params["id"]
    CurrencyModel.findOne({_id: currencyID}, (err, result) =>{
      if(err) {
		console.log(err);
        return res.status(500).json(err);
      }
      if(result) {
        result.code = req.body.code;
        result.before = req.body.before;
        result.description = req.body.description;
        result.showCents = req.body.showCents;
        result.format = req.body.format;
        result.market = req.body.market;
        result.save((error,currency) => {
          if(error) {
            return res.status(500).json(err)
          }
          return res.json(currency)
        })
      }
      return response.status(404).json({
        message: "Currency definition with id" + currencyId + "not found"
      })
    })
  },

  delete(req,res) {
    const currencyId = req.params["id"];
    CurrencyModel.findOne({_id: currencyID}, (err, result) =>{
      if(err) {
		console.log(err);
        return res.status(500).json(err);
      }
      if(result) {
        result.remove((error) => {
          if(error) {
			console.log(err);
            return res.status(500).json(err)
          }
          return res.json({
            message : "Currency definition with id" + currencyId + "has been eliminated"
          })
        })
      }
      return response.status(404).json({
        message: "Currency definition with id" + currencyId + "not found"
      })
    })
  }
};
