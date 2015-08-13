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
export class Contact {

    constructor(name, forename, surname,
                title, gender, salutation, nationality,
                dob, birthplace,
                companyname,
                email, phone, mobile, address,
                urlWebsite, picture) {
        this.name = name;
        this.forename = forename;
        this.surname = surname;
        this.title = title;
        this.gender = gender;
        this.salutation = salutation;
        this.nationality = nationality;
        this.dob = dob;
        this.birthplace = birthplace;
        this.companyname = companyname;
        this.email = email;
        this.phone = phone;
        this.mobile = mobile;
        this.address = address;
        this.urlWebsite = urlWebsite;
        this.picture = picture;
    }

}
