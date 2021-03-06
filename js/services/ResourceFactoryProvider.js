(function(module) {
  mifosX.services = _.extend(module, {
    ResourceFactoryProvider: function() {
      var baseUrl = "" , apiVer = "/mifosng-provider/api/v1";
      this.setBaseUrl = function(url) {baseUrl = url;};
      this.$get = ['$resource', function(resource) {
        var defineResource = function(url, paramDefaults, actions) {
          return resource(baseUrl + url, paramDefaults, actions);
        };
        return {
          userResource: defineResource(apiVer + "/users/:userId", {}, {
            getAllUsers: {method: 'GET', params: {fields: "id,firstname,lastname,username,officeName"}, isArray: true}
          }),
          roleResource: defineResource(apiVer + "/roles/:roleId", {}, {
            getAllRoles: {method: 'GET', params: {}, isArray: true}
          }),
          officeResource: defineResource(apiVer + "/offices/:officeId", {officeId:"@officeId"}, {
            getAllOffices: {method: 'GET', params: {}, isArray: true}
          }),
          clientResource: defineResource(apiVer + "/clients/:clientId", {clientId:'@clientId'}, {
            getAllClients: {method: 'GET', params: {}}
          }),
          clientAccountResource: defineResource(apiVer + "/clients/:clientId/accounts", {clientId:'@clientId'}, {
            getAllClients: {method: 'GET', params: {}}
          }),
          clientNotesResource: defineResource(apiVer + "/clients/:clientId/notes", {clientId:'@clientId'}, {
            getAllNotes: {method: 'GET', params: {}, isArray:true}
          }),
          clientTemplateResource: defineResource(apiVer + "/clients/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          loanProductResource: defineResource(apiVer + "/loanproducts/:loanProductId", {loanProductId:'@loanProductId'}, {
            getAllLoanProducts: {method: 'GET', params: {}, isArray:true}
          }),
          chargeResource: defineResource(apiVer + "/charges/:chargeId", {chargeId:'@chargeId'}, {
            getAllCharges: {method: 'GET', params: {}, isArray:true}
          }),
          savingProductResource: defineResource(apiVer + "/savingsproducts/:savingproductId", {}, {
            getAllSavingProducts: {method: 'GET', params: {}, isArray:true}
          }),
          loanResource: defineResource(apiVer + "/loans/:loanId", {}, {
            getAllLoans: {method: 'GET', params: {}}
          }),
          currencyConfigResource: defineResource(apiVer + "/currencies", {}, {
            update: { method: 'PUT'}
          }),
          userListResource: defineResource(apiVer + "/users/:userId", {userId:'@userId'}, {
            getAllUsers: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT' }
          }),
          userTemplateResource: defineResource(apiVer + "/users/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          employeeResource: defineResource(apiVer + "/staff/:staffId", {staffId:'@staffId'}, {
            getAllEmployees: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT'}
          }),
          globalSearch: defineResource(apiVer + "/search", {query:'@query'}, {
            search: { method: 'GET',
                      params: { query: '@query'} ,
                      isArray:true
                    }
          }),
          fundsResource: defineResource(apiVer + "/funds/:fundId", {fundId:'@fundId'}, {
            getAllFunds: {method: 'GET', params: {}, isArray: true}
          }),
          accountingRulesResource: defineResource(apiVer + "/accountingrules", {}, {
            getAllRules: {method: 'GET', params: {associations : 'all'}, isArray: true}
          }),
          accountCoaResource: defineResource(apiVer + "/glaccounts/:glAccountId", {glAccountId:'@glAccountId'}, {
            getAllAccountCoas: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT' }
          }),
          accountCoaTemplateResource: defineResource(apiVer + "/glaccounts/template", {}, {
            get: {method: 'GET', params: {}}
          })
        };
      }];
    }
  });
  mifosX.ng.services.config(function($provide) {
    $provide.provider('ResourceFactory', mifosX.services.ResourceFactoryProvider);
  }).run(function($log) { $log.info("ResourceFactory initialized"); });
}(mifosX.services || {}));
