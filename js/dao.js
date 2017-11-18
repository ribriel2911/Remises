 var serviceCall = function(urlParam, callbackParam) {
        var callback = callbackParam;
        ajaxDialog = function (urlParam) {
            // Promise to let me know when complete
            return $.ajax({
                url: urlParam,
                dataType: 'json',
            }).promise();

        };

        teste2 = ajaxDialog(urlParam);

        teste2.done(function (result) {
            callback(result);
        });
};