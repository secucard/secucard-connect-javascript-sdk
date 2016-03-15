/*
 Copyright 2015 hp.weber GmbH & Co secucard KG (www.secucard.com)
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
export class Customer {

    constructor(merchant, forename, surname, company,
                display_name, salutation, title,
                street, zipcode, city, email, fax, mobile, note, phone,
                age, days_until_birthday, additional_data, customernumber,
                dob, picture) {
        this.merchant = merchant;
        this.forename = forename;
        this.surname = surname;
        this.company = company;
        this.display_name = display_name;
        this.salutation = salutation;
        this.title = title;
        this.street = street;
        this.zipcode = zipcode;
        this.city = city;
        this.email = email;
        this.fax = fax;
        this.mobile = mobile;
        this.note = note;
        this.phone = phone;
        this.age = age;
        this.days_until_birthday = days_until_birthday;
        this.additional_data = additional_data;
        this.customernumber = customernumber;
        this.dob = dob;
        this.picture = picture;
    }

}
