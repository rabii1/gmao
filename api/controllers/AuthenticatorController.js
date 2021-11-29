/**
 * AuthenticatorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    Authentifier: function (req, res) {

        console.log(req.body);


        if (req.method == 'POST') {

            console.log("SuperAdmin connexion")
            const superadmin = SuperAdmin.find(req.body, {}).exec((error, superadmin) => {

                console.log(superadmin);
                console.log(req.body.email);
                console.log(req.body.password);

                if (superadmin.length > 0) {

                    req.session.authenticated = true;
                    res.json({ status: true, role: "superadmin", user: superadmin })
                    // return res.status(200).json({
                    //     token: jwt.sign(user.toJSON(), 'secret')
                    //   });
                }

                else {
                    const admin = Admin.find({ email: req.body.email, password: req.body.password }, {}).exec((error, admin) => {

                        console.log("Admin connexion")

                        console.log(admin);
                        console.log(req.body.email);
                        console.log(req.body.password);


                        if (admin.length > 0) {

                            req.session.authenticated = true;

                            res.json({ status: true, role: "admin", user: admin })


                        }
                        else {

                            const technicien = Technicien.find({ email: req.body.email, password: req.body.password }, {}).exec((error, technicien) => {

                                console.log(" technicien conexion")


                                console.log(technicien);
                                console.log(req.body.email);
                                console.log(req.body.password);

                                if (technicien.length > 0) {

                                    req.session.authenticated = true;
                                    res.json({ status: true, role: "technicien", user: technicien })



                                }



                                else {

                                    const employee = Employee.find({ email: req.body.email, password: req.body.password }, {}).exec((error, employee) => {

                                        console.log(" employee conexion")

                                        console.log(employee);
                                        console.log(req.body.email);
                                        console.log(req.body.password);

                                        if (employee.length > 0) {

                                            req.session.authenticated = true;

                                            res.json({ status: true, role: "employee", user: employee })





                                        }
                                        else {
                                            res.json({ status: false, role: 'none', user: null })

                                        }

                                    });

                                }

                            });

                        }
                    });
                }
            });
        }
        else {

            res.json({ msg: "GET NOT ALLOAWED" })
        }

    },

    logout: function (req, res) {


        req.session.authenticated = false;
        req.session.destroy(function (err) {
            return res.json({ task: 'ok' })
        });

    },

    updateSelonRole: function (  req, res) {



        if (req.method == 'POST') {

            // get params from post ;)
            var role=req.body.role;
            var obj=req.body.data;


                if(role=="superadmin"){


                    const superadmin = SuperAdmin.update({id:req.body.id}).set(req.body.data).exec((error, superadmin) => {
                               
                        this.superadmin=obj;
                        res.json("updated successfully",201)

                    })
                }
                else if (role=="admin"){
                    const admin = Admin.update({id:req.body.id}).set(req.body.data).exec((error, admin) => {


                        this.admin=obj;
                        res.json("updated successfully",201)


                    })
                           

                }
                else if (role=="technicien"){
                    const technicien = Technicien.update({id:req.body.id}).set(req.body.data).exec((error, technicien) => {
                        this.technicien=obj;
                        res.json("updated successfully",201)
                    })
                           

                }
                else if (role=="employee"){
                    const employee = Employee.update({id:req.body.id}).set(req.body.data).exec((error, employee) => {
                        this.employee=obj;
                        res.json("updated successfully",201)


                    })
                       
                          

                }
                else {
                    //res.error('sorry get not permitted ',400)
                    res.json('update problem ',403)
                }
       
         }      else {
            //res.error('sorry get not permitted ',400)
            res.json('sorry get not permitted ',400)
        }
    }
 
 
      
   

};  
