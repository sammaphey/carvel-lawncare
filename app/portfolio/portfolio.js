app.controller("portfolioCtrl", function($scope, $uibModal, $http) {

    $scope.myInterval = 3000;

    $http.get('https://spreadsheets.google.com/feeds/list/1mSZtMHUd6WsUc1wT8vPyhfgZnhfJ3pVi80b3MjF2vGI/od6/public/values?alt=json').then(function(response) {
        $scope.items = response.data.feed.entry;
        console.log($scope.items);
    });

    var $ctrl = this;

    $ctrl.animationsEnabled = true;

    $ctrl.open = function(size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            windowClass: 'center-modal',
            controller: function($uibModalInstance, $scope) {
                // get all data in form and return object
                $scope.getFormData = function() {
                    var elements = document.getElementById("reviewModal").elements; // all form elements
                    var fields = Object.keys(elements).map(function(k) {
                        if (elements[k].name !== undefined) {
                            return elements[k].name;
                            // special case for Edge's html collection
                        } else if (elements[k].length > 0) {
                            return elements[k].item(0).name;
                        }
                    }).filter(function(item, pos, self) {
                        return self.indexOf(item) == pos && item;
                    });
                    var data = {};
                    fields.forEach(function(k) {
                        data[k] = elements[k].value;
                        var str = ""; // declare empty string outside of loop to allow
                        // it to be appended to for each item in the loop
                        if (elements[k].type === "checkbox") { // special case for Edge's html collection
                            str = str + elements[k].checked + ", "; // take the string and append
                            // the current checked value to
                            // the end of it, along with
                            // a comma and a space
                            data[k] = str.slice(0, -2); // remove the last comma and space
                            // from the  string to make the output
                            // prettier in the spreadsheet
                        } else if (elements[k].length) {
                            for (var i = 0; i < elements[k].length; i++) {
                                if (elements[k].item(i).checked) {
                                    str = str + elements[k].item(i).value + ", "; // same as above
                                    data[k] = str.slice(0, -2);
                                }
                            }
                        }
                    });
                    return data;
                }

                $scope.handleFormSubmit = function(event) { // handles form submit withtout any jquery
                    event.preventDefault(); // we are submitting via xhr below
                    var data = $scope.getFormData();
                    var url = event.target.action; //
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', url);
                    // xhr.withCredentials = true;
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.onreadystatechange = function() { // hide form
                        return;
                    };
                    // url encode form data for sending as post data
                    var encoded = Object.keys(data).map(function(k) {
                        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
                    }).join('&')
                    xhr.send(encoded);

                }

                $scope.loaded = function() {
                    console.log('contact form submission handler loaded successfully');
                    // bind to the submit event of our form
                    var form = document.getElementById('reviewModal');
                    form.addEventListener("submit", $scope.handleFormSubmit, false);
                };
                document.addEventListener('DOMContentLoaded', $scope.loaded, false);

                $scope.ok = function() {
                    $uibModalInstance.close({
                        animation: true
                    });
                    alert('Your review has been added. Thank you!');
                }
                $scope.cancel = function() {
                    $uibModalInstance.close({
                        animation: true
                    });
                }
            },
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function() {
                    return $ctrl.items;
                }
            }
        });
    };
});
