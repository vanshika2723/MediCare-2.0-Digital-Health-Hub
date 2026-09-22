/* =========================================================
   MEDICARE 2.0 | DIGITAL HEALTH HUB
   COMPLETE SCRIPT
   Matches the current index.html exactly
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       GLOBAL HELPERS
    ===================================================== */

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const showToast = (message, type = "success") => {
        const toast = $("#toast");

        if (!toast) return;

        const icon = toast.querySelector("i");
        const text = toast.querySelector("span");

        if (text) text.textContent = message;

        if (icon) {
            icon.className =
                type === "error"
                    ? "fa-solid fa-circle-exclamation"
                    : "fa-solid fa-circle-check";
        }

        toast.classList.add("show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    };


    const openModal = (modal) => {
        if (!modal) return;

        modal.classList.add("active");
        document.body.classList.add("modal-open");
    };


    const closeModal = (modal) => {
        if (!modal) return;

        modal.classList.remove("active");

        if (!document.querySelector(".modal.active")) {
            document.body.classList.remove("modal-open");
        }
    };


    /* =====================================================
       DOCTOR DATA
    ===================================================== */

    const doctors = [
        {
            id: "aarav-sharma",
            name: "Dr. Aarav Sharma",
            department: "Cardiology",
            qualification: "MD, DM Cardiology",
            experience: "14 Years",
            rating: "4.9",
            fee: "₹1,200",
            availability: "Available Today",
            mode: "Clinic + Video",
            education: "MD Medicine • DM Cardiology",
            days: "Mon - Sat",
            hours: "09:00 AM - 05:00 PM",
            about:
                "Demo cardiology specialist profile for the MediCare front-end project.",
            image:
                "https://t4.ftcdn.net/jpg/02/69/98/99/360_F_269989951_9Gf7PWaRtrpm2EochO3D5WVn22sFZbNZ.jpg"
        },

        {
            id: "priya-mehta",
            name: "Dr. Priya Mehta",
            department: "Neurology",
            qualification: "MD, DM Neurology",
            experience: "11 Years",
            rating: "4.8",
            fee: "₹1,000",
            availability: "Available Today",
            mode: "Clinic + Video",
            education: "MD Medicine • DM Neurology",
            days: "Mon - Fri",
            hours: "10:00 AM - 06:00 PM",
            about:
                "Demo neurology specialist profile created for the MediCare project.",
            image:
                "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=85"
        },

        {
            id: "riya-kapoor",
            name: "Dr. Riya Kapoor",
            department: "Pediatrics",
            qualification: "MD Pediatrics",
            experience: "9 Years",
            rating: "4.9",
            fee: "₹800",
            availability: "Available Today",
            mode: "Clinic",
            education: "MBBS • MD Pediatrics",
            days: "Mon - Sat",
            hours: "09:30 AM - 04:30 PM",
            about:
                "Demo pediatric specialist profile for the MediCare interface.",
            image:
                "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/2026-06/dr-maileng-tham.jpg"
        },

        {
            id: "kabir-verma",
            name: "Dr. Kabir Verma",
            department: "Dental Care",
            qualification: "BDS, MDS",
            experience: "8 Years",
            rating: "4.8",
            fee: "₹700",
            availability: "Available Today",
            mode: "Clinic",
            education: "BDS • MDS Dental Surgery",
            days: "Mon - Sat",
            hours: "10:00 AM - 05:00 PM",
            about:
                "Demo dental specialist profile for this front-end healthcare project.",
            image:
                "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=85"
        },

        {
            id: "neha-singh",
            name: "Dr. Neha Singh",
            department: "Orthopedics",
            qualification: "MS Orthopedics",
            experience: "12 Years",
            rating: "4.7",
            fee: "₹900",
            availability: "Available Today",
            mode: "Clinic + Video",
            education: "MBBS • MS Orthopedics",
            days: "Mon - Fri",
            hours: "09:00 AM - 04:00 PM",
            about:
                "Demo orthopedic specialist profile for the MediCare project.",
            image:
                "https://drupal-cdn-hfaeddcdbng5hfbg.a01.azurefd.net/sites/default/files/styles/doctor_card/public/2026-06/dr-akriba-ahmed.jpg.webp?itok=exehWfXk"
        },

        {
            id: "raj-malhotra",
            name: "Dr. Raj Malhotra",
            department: "General Medicine",
            qualification: "MBBS, MD",
            experience: "15 Years",
            rating: "4.9",
            fee: "₹600",
            availability: "Available Today",
            mode: "Clinic + Video",
            education: "MBBS • MD General Medicine",
            days: "Mon - Sat",
            hours: "08:30 AM - 05:00 PM",
            about:
                "Demo general medicine specialist profile for the MediCare interface.",
            image:
                "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=700&q=85"
        }
    ];


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = $("#menuToggle");
    const navMenu = $("#navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = navMenu.classList.contains("active")
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";
            }
        });
    }


    $$(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu?.classList.remove("active");

            const icon = menuToggle?.querySelector("i");

            if (icon) {
                icon.className = "fa-solid fa-bars";
            }
        });
    });


    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const themeToggle = $("#themeToggle");

    const savedTheme = localStorage.getItem("medicareTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }


    const updateThemeIcon = () => {
        const icon = themeToggle?.querySelector("i");

        if (!icon) return;

        icon.className = document.body.classList.contains("dark-mode")
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
    };

    updateThemeIcon();


    themeToggle?.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const theme = document.body.classList.contains("dark-mode")
            ? "dark"
            : "light";

        localStorage.setItem("medicareTheme", theme);

        updateThemeIcon();

        showToast(
            theme === "dark"
                ? "Dark mode enabled"
                : "Light mode enabled"
        );
    });


    /* =====================================================
       DOCTOR RENDERING
    ===================================================== */

    const doctorGrid = $("#doctorGrid");


    const renderDoctors = (list = doctors) => {
        if (!doctorGrid) return;

        if (!list.length) {
            doctorGrid.innerHTML = `
                <div class="doctor-empty">
                    <div>
                        <i class="fa-solid fa-user-doctor"></i>
                    </div>

                    <h3>No specialists found</h3>

                    <p>
                        Try another doctor name or specialization.
                    </p>
                </div>
            `;

            return;
        }


        doctorGrid.innerHTML = list
            .map(
                (doctor) => `
                <article class="doctor-card">

                    <div class="doctor-image">

                        <img
                            src="${doctor.image}"
                            alt="${doctor.name}"
                            loading="lazy"
                            onerror="this.onerror=null;this.src='https://placehold.co/700x800/e8f5f2/0f766e?text=Doctor';"
                        >

                        <span class="doctor-status">
                            <i class="fa-solid fa-circle"></i>
                            Available
                        </span>

                    </div>


                    <div class="doctor-card-body">

                        <span class="doctor-specialization">
                            ${doctor.department}
                        </span>

                        <h3>
                            ${doctor.name}
                        </h3>

                        <p class="doctor-qualification">
                            ${doctor.qualification}
                        </p>


                        <div class="doctor-meta">

                            <span>
                                <i class="fa-solid fa-star"></i>
                                ${doctor.rating}
                            </span>

                            <span>
                                <i class="fa-solid fa-briefcase"></i>
                                ${doctor.experience}
                            </span>

                        </div>


                        <div class="doctor-bottom">

                            <div class="doctor-fee">

                                <small>
                                    Consultation
                                </small>

                                <strong>
                                    ${doctor.fee}
                                </strong>

                            </div>


                            <div class="doctor-actions">

                                <button
                                    type="button"
                                    class="profile-btn"
                                    data-doctor="${doctor.name}"
                                >
                                    Profile
                                </button>

                                <button
                                    type="button"
                                    class="doctor-btn"
                                    data-doctor="${doctor.name}"
                                    data-department="${doctor.department}"
                                >
                                    Book
                                </button>

                            </div>

                        </div>

                    </div>

                </article>
            `
            )
            .join("");


        attachDoctorButtons();
    };


    /* =====================================================
       DOCTOR SEARCH / FILTER
    ===================================================== */

    const doctorSearch = $("#doctorSearch");
    const specialtyFilter = $("#specialtyFilter");


    const filterDoctors = () => {
        const searchTerm =
            doctorSearch?.value.toLowerCase().trim() || "";

        const specialty =
            specialtyFilter?.value || "all";


        const filtered = doctors.filter((doctor) => {
            const matchesSearch =
                doctor.name.toLowerCase().includes(searchTerm) ||
                doctor.department.toLowerCase().includes(searchTerm) ||
                doctor.qualification.toLowerCase().includes(searchTerm);

            const matchesSpecialty =
                specialty === "all" ||
                doctor.department === specialty;

            return matchesSearch && matchesSpecialty;
        });


        renderDoctors(filtered);
    };


    doctorSearch?.addEventListener("input", filterDoctors);
    specialtyFilter?.addEventListener("change", filterDoctors);


    /* =====================================================
       DOCTOR PROFILE MODAL
    ===================================================== */

    const doctorProfile = $("#doctorProfile");


    const openDoctorProfile = (doctorName) => {
        const doctor = doctors.find(
            (item) => item.name === doctorName
        );

        if (!doctor || !doctorProfile) return;


        const content = doctorProfile.querySelector(".modal-content");

        if (!content) return;


        content.innerHTML = `
            <button
                class="modal-close"
                id="closeDoctorProfile"
                type="button"
                aria-label="Close"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>


            <div class="profile-layout">

                <div class="profile-image">

                    <img
                        src="${doctor.image}"
                        alt="${doctor.name}"
                        onerror="this.onerror=null;this.src='https://placehold.co/600x700/e8f5f2/0f766e?text=Doctor';"
                    >

                </div>


                <div class="profile-info">

                    <span class="section-label">
                        ${doctor.department}
                    </span>

                    <h2>
                        ${doctor.name}
                    </h2>

                    <p class="profile-qualification">
                        ${doctor.qualification}
                    </p>


                    <div class="profile-rating">

                        <span>
                            <i class="fa-solid fa-star"></i>
                            ${doctor.rating}
                        </span>

                        <span>
                            <i class="fa-solid fa-briefcase"></i>
                            ${doctor.experience}
                        </span>

                    </div>


                    <div class="profile-details">

                        <div>
                            <i class="fa-solid fa-graduation-cap"></i>

                            <div>
                                <small>Education</small>
                                <strong>${doctor.education}</strong>
                            </div>
                        </div>


                        <div>
                            <i class="fa-solid fa-calendar-days"></i>

                            <div>
                                <small>Available</small>
                                <strong>${doctor.days}</strong>
                            </div>
                        </div>


                        <div>
                            <i class="fa-solid fa-clock"></i>

                            <div>
                                <small>Hours</small>
                                <strong>${doctor.hours}</strong>
                            </div>
                        </div>


                        <div>
                            <i class="fa-solid fa-indian-rupee-sign"></i>

                            <div>
                                <small>Consultation</small>
                                <strong>${doctor.fee}</strong>
                            </div>
                        </div>

                    </div>


                    <p class="profile-about">
                        ${doctor.about}
                    </p>


                    <div class="profile-actions">

                        <button
                            type="button"
                            class="submit-btn profile-book-btn"
                            data-doctor="${doctor.name}"
                            data-department="${doctor.department}"
                        >
                            <i class="fa-solid fa-calendar-check"></i>
                            Book Appointment
                        </button>

                    </div>

                </div>

            </div>
        `;


        openModal(doctorProfile);


        $("#closeDoctorProfile")?.addEventListener(
            "click",
            () => closeModal(doctorProfile)
        );


        $(".profile-book-btn")?.addEventListener(
            "click",
            (event) => {
                const button = event.currentTarget;

                closeModal(doctorProfile);

                selectDoctorForBooking(
                    button.dataset.doctor,
                    button.dataset.department
                );
            }
        );
    };


    /* =====================================================
       DOCTOR BOOKING
    ===================================================== */

    const selectDoctorForBooking = (
        doctorName,
        department
    ) => {
        const departmentSelect = $("#department");
        const doctorSelect = $("#doctor");

        if (departmentSelect) {
            departmentSelect.value = department;
        }

        populateDoctorSelect(department);


        if (doctorSelect) {
            doctorSelect.value = doctorName;
        }


        const appointmentSection = $("#appointment");

        appointmentSection?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        setTimeout(() => {
            $("#patientName")?.focus();
        }, 700);


        showToast(`${doctorName} selected for booking`);
    };


    const attachDoctorButtons = () => {

        $$(".profile-btn").forEach((button) => {
            button.addEventListener("click", () => {
                openDoctorProfile(button.dataset.doctor);
            });
        });


        $$(".doctor-btn").forEach((button) => {
            button.addEventListener("click", () => {
                selectDoctorForBooking(
                    button.dataset.doctor,
                    button.dataset.department
                );
            });
        });
    };


    renderDoctors();


    /* =====================================================
       APPOINTMENT FORM - DOCTOR DROPDOWN
    ===================================================== */

    const departmentSelect = $("#department");
    const doctorSelect = $("#doctor");


    const populateDoctorSelect = (department = "") => {
        if (!doctorSelect) return;

        const filtered = department
            ? doctors.filter(
                  (doctor) =>
                      doctor.department === department
              )
            : doctors;


        doctorSelect.innerHTML = `
            <option value="">
                Choose a doctor
            </option>
        `;


        filtered.forEach((doctor) => {
            const option = document.createElement("option");

            option.value = doctor.name;
            option.textContent =
                `${doctor.name} — ${doctor.department}`;

            doctorSelect.appendChild(option);
        });
    };


    populateDoctorSelect();


    departmentSelect?.addEventListener("change", () => {
        populateDoctorSelect(departmentSelect.value);
    });


    /* =====================================================
       DATE SETUP
    ===================================================== */

    const appointmentDate = $("#date");

    const getToday = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    if (appointmentDate) {
        appointmentDate.min = getToday();
    }


    /* =====================================================
       TIME SLOT SELECTION
    ===================================================== */

    let selectedTime = "";


    const selectTimeSlot = (button) => {

        $$(".time-slot").forEach((slot) => {
            slot.classList.remove("selected");
        });


        button.classList.add("selected");

        selectedTime = button.dataset.time || "";


        showToast(`Time selected: ${selectedTime}`);
    };


    $$(".time-slot").forEach((slot) => {
        slot.addEventListener("click", () => {
            selectTimeSlot(slot);
        });
    });


    /* =====================================================
       APPOINTMENT STORAGE
    ===================================================== */

    const APPOINTMENT_KEY = "medicareAppointments";


    const getAppointments = () => {
        try {
            return JSON.parse(
                localStorage.getItem(APPOINTMENT_KEY)
            ) || [];
        } catch {
            return [];
        }
    };


    const saveAppointments = (appointments) => {
        localStorage.setItem(
            APPOINTMENT_KEY,
            JSON.stringify(appointments)
        );
    };


    const generateAppointmentId = () => {
        const random = Math.floor(
            100000 + Math.random() * 900000
        );

        return `MC-${random}`;
    };


    /* =====================================================
       SUCCESS MODAL
    ===================================================== */

    const successModal = $("#successModal");
    const successDetails = $(".success-details");


    const showSuccessModal = (appointment) => {

        if (successDetails) {
            successDetails.innerHTML = `
                <div class="confirmation-row">
                    <span>Appointment ID</span>
                    <strong>${appointment.id}</strong>
                </div>

                <div class="confirmation-row">
                    <span>Patient</span>
                    <strong>${appointment.patientName}</strong>
                </div>

                <div class="confirmation-row">
                    <span>Doctor</span>
                    <strong>${appointment.doctor}</strong>
                </div>

                <div class="confirmation-row">
                    <span>Department</span>
                    <strong>${appointment.department}</strong>
                </div>

                <div class="confirmation-row">
                    <span>Date</span>
                    <strong>${formatDate(appointment.date)}</strong>
                </div>

                <div class="confirmation-row">
                    <span>Time</span>
                    <strong>${appointment.time}</strong>
                </div>
            `;
        }


        openModal(successModal);
    };


    $("#closeSuccess")?.addEventListener(
        "click",
        () => closeModal(successModal)
    );


    $("#successDone")?.addEventListener(
        "click",
        () => closeModal(successModal)
    );


    /* =====================================================
       APPOINTMENT SUBMIT
    ===================================================== */

    const appointmentForm = $("#appointmentForm");


    appointmentForm?.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            if (!selectedTime) {
                showToast(
                    "Please select an appointment time.",
                    "error"
                );

                return;
            }


            const patientName =
                $("#patientName")?.value.trim();

            const patientPhone =
                $("#patientPhone")?.value.trim();

            const patientEmail =
                $("#patientEmail")?.value.trim();

            const department =
                $("#department")?.value;

            const doctor =
                $("#doctor")?.value;

            const date =
                $("#date")?.value;

            const message =
                $("#message")?.value.trim();


            if (
                !patientName ||
                !patientPhone ||
                !patientEmail ||
                !department ||
                !doctor ||
                !date
            ) {
                showToast(
                    "Please complete all required fields.",
                    "error"
                );

                return;
            }


            if (!/^[0-9]{10}$/.test(patientPhone)) {
                showToast(
                    "Please enter a valid 10-digit phone number.",
                    "error"
                );

                return;
            }


            const appointment = {
                id: generateAppointmentId(),
                patientName,
                patientPhone,
                patientEmail,
                department,
                doctor,
                date,
                time: selectedTime,
                message,
                status: "Confirmed",
                createdAt: new Date().toISOString()
            };


            const appointments = getAppointments();

            appointments.push(appointment);

            saveAppointments(appointments);


            renderAppointments();


            showSuccessModal(appointment);


            appointmentForm.reset();

            selectedTime = "";


            $$(".time-slot").forEach((slot) => {
                slot.classList.remove("selected");
            });


            populateDoctorSelect();


            showToast("Appointment confirmed successfully!");
        }
    );


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(
            `${dateString}T00:00:00`
        );

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };


    /* =====================================================
       APPOINTMENT TIMELINE
    ===================================================== */

    const appointmentsList = $("#appointmentsList");


    const renderAppointments = () => {

        if (!appointmentsList) return;


        const appointments = getAppointments();


        if (!appointments.length) {

            appointmentsList.innerHTML = `
                <div class="empty-appointments">

                    <div class="empty-icon">
                        <i class="fa-regular fa-calendar"></i>
                    </div>

                    <h3>
                        No appointments yet
                    </h3>

                    <p>
                        Your confirmed visits will appear here.
                    </p>

                    <a
                        href="#appointment"
                        class="btn primary-btn"
                    >
                        Book Your First Visit
                    </a>

                </div>
            `;

            return;
        }


        appointmentsList.innerHTML = appointments
            .map(
                (appointment) => `
                <article
                    class="appointment-card"
                    data-id="${appointment.id}"
                >

                    <div class="appointment-card-left">

                        <div class="appointment-date-box">

                            <span>
                                ${getDateDay(appointment.date)}
                            </span>

                            <strong>
                                ${getDateMonth(appointment.date)}
                            </strong>

                        </div>


                        <div class="appointment-info">

                            <span class="appointment-status ${appointment.status.toLowerCase()}">
                                <i class="fa-solid fa-circle-check"></i>
                                ${appointment.status}
                            </span>

                            <h3>
                                ${appointment.doctor}
                            </h3>

                            <p>
                                ${appointment.department}
                            </p>

                            <div class="appointment-meta">

                                <span>
                                    <i class="fa-regular fa-calendar"></i>
                                    ${formatDate(appointment.date)}
                                </span>

                                <span>
                                    <i class="fa-regular fa-clock"></i>
                                    ${appointment.time}
                                </span>

                            </div>

                        </div>

                    </div>


                    <div class="appointment-actions">

                        <button
                            type="button"
                            class="reschedule-btn"
                            data-id="${appointment.id}"
                        >
                            <i class="fa-solid fa-calendar-days"></i>
                            Reschedule
                        </button>

                        <button
                            type="button"
                            class="cancel-btn"
                            data-id="${appointment.id}"
                        >
                            <i class="fa-solid fa-xmark"></i>
                            Cancel
                        </button>

                    </div>

                </article>
            `
            )
            .join("");


        attachAppointmentActions();
    };


    const getDateDay = (dateString) => {
        const date = new Date(
            `${dateString}T00:00:00`
        );

        return date.getDate();
    };


    const getDateMonth = (dateString) => {
        const date = new Date(
            `${dateString}T00:00:00`
        );

        return date.toLocaleDateString(
            "en-IN",
            { month: "short" }
        );
    };


    /* =====================================================
       RESCHEDULE
    ===================================================== */

    const rescheduleModal = $("#rescheduleModal");
    const rescheduleId = $("#rescheduleId");
    const rescheduleDate = $("#rescheduleDate");
    const rescheduleTime = $("#rescheduleTime");
    const rescheduleDoctor = $(".reschedule-doctor");


    const openReschedule = (appointmentId) => {

        const appointments = getAppointments();

        const appointment = appointments.find(
            (item) => item.id === appointmentId
        );


        if (!appointment) return;


        if (rescheduleId) {
            rescheduleId.value = appointment.id;
        }


        if (rescheduleDoctor) {
            rescheduleDoctor.textContent =
                appointment.doctor;
        }


        if (rescheduleDate) {
            rescheduleDate.value =
                appointment.date;

            rescheduleDate.min =
                getToday();
        }


        if (rescheduleTime) {
            rescheduleTime.value =
                appointment.time;
        }


        openModal(rescheduleModal);
    };


    $("#closeReschedule")?.addEventListener(
        "click",
        () => closeModal(rescheduleModal)
    );


    $("#confirmReschedule")?.addEventListener(
        "click",
        () => {

            const id =
                rescheduleId?.value;

            const newDate =
                rescheduleDate?.value;

            const newTime =
                rescheduleTime?.value;


            if (!id || !newDate || !newTime) {
                showToast(
                    "Please select a new date and time.",
                    "error"
                );

                return;
            }


            const appointments = getAppointments();

            const index = appointments.findIndex(
                (item) => item.id === id
            );


            if (index === -1) return;


            appointments[index].date = newDate;
            appointments[index].time = newTime;
            appointments[index].status =
                "Rescheduled";


            saveAppointments(appointments);

            renderAppointments();

            closeModal(rescheduleModal);

            showToast(
                "Appointment rescheduled successfully."
            );
        }
    );


    /* =====================================================
       CANCEL APPOINTMENT
    ===================================================== */

    const cancelAppointment = (appointmentId) => {

        const appointments = getAppointments();

        const appointment = appointments.find(
            (item) => item.id === appointmentId
        );


        if (!appointment) return;


        const confirmed = window.confirm(
            `Cancel appointment with ${appointment.doctor}?`
        );


        if (!confirmed) return;


        const updated = appointments.filter(
            (item) => item.id !== appointmentId
        );


        saveAppointments(updated);

        renderAppointments();

        showToast("Appointment cancelled.");
    };


    const attachAppointmentActions = () => {

        $$(".reschedule-btn").forEach((button) => {
            button.addEventListener("click", () => {
                openReschedule(button.dataset.id);
            });
        });


        $$(".cancel-btn").forEach((button) => {
            button.addEventListener("click", () => {
                cancelAppointment(button.dataset.id);
            });
        });
    };


    renderAppointments();


    /* =====================================================
       CARE CONCIERGE
    ===================================================== */

/* =====================================================
   CARE CONCIERGE
   ===================================================== */

const conciergeSelections = {
    concern: "",
    urgency: "",
    mode: ""
};

const conciergeButton = document.getElementById("conciergeButton");
const resetConcierge = document.getElementById("resetConcierge");
const conciergeResult = document.getElementById("conciergeResult");


// ---------------------------------------------
// SELECT CONCIERGE OPTIONS
// ---------------------------------------------

document.querySelectorAll(".concierge-option").forEach((button) => {

    button.addEventListener("click", () => {

        const group = button.dataset.group;
        const value = button.dataset.value;

        if (!group || !value) return;


        // Remove active state only from same group
        document
            .querySelectorAll(
                `.concierge-option[data-group="${group}"]`
            )
            .forEach((item) => {
                item.classList.remove("selected");
                item.classList.remove("active");
            });


        // Activate selected option
        button.classList.add("selected");
        button.classList.add("active");


        // Save selection
        conciergeSelections[group] = value;


        // Update progress
        updateConciergeProgress();

    });

});


// ---------------------------------------------
// UPDATE PROGRESS
// ---------------------------------------------

function updateConciergeProgress() {

    const progress =
        document.querySelectorAll(".concierge-progress span");

    if (!progress.length) return;


    const completed =
        Object.values(conciergeSelections)
            .filter(Boolean)
            .length;


    progress.forEach((item, index) => {

        item.classList.remove("active");
        item.classList.remove("completed");

        if (index < completed) {
            item.classList.add("completed");
        }

        if (index === completed && completed < 3) {
            item.classList.add("active");
        }

    });

}


// ---------------------------------------------
// FIND CARE PATH
// ---------------------------------------------

if (conciergeButton) {

    conciergeButton.addEventListener("click", () => {

        const {
            concern,
            urgency,
            mode
        } = conciergeSelections;


        // Check all selections
        if (!concern || !urgency || !mode) {

            showToast(
                "Please complete all 3 steps first.",
                "error"
            );

            // Highlight missing step
            highlightMissingConciergeStep();

            return;
        }


        const recommendations = {

            heart: {
                department: "Cardiology",
                doctor: "Dr. Aarav Sharma",
                icon: "fa-heart-pulse",
                color: "heart"
            },

            headache: {
                department: "Neurology",
                doctor: "Dr. Priya Mehta",
                icon: "fa-head-side-virus",
                color: "brain"
            },

            child: {
                department: "Pediatrics",
                doctor: "Dr. Riya Kapoor",
                icon: "fa-child",
                color: "child"
            },

            dental: {
                department: "Dental Care",
                doctor: "Dr. Kabir Verma",
                icon: "fa-tooth",
                color: "dental"
            },

            bones: {
                department: "Orthopedics",
                doctor: "Dr. Neha Singh",
                icon: "fa-bone",
                color: "bones"
            },

            general: {
                department: "General Medicine",
                doctor: "Dr. Raj Malhotra",
                icon: "fa-stethoscope",
                color: "general"
            }

        };


        const recommendation =
            recommendations[concern];


        if (!recommendation) {
            showToast(
                "Unable to create a care path.",
                "error"
            );

            return;
        }


        const urgencyText = {

            routine: "Routine consultation",

            today: "Preferably today",

            soon: "As soon as convenient"

        };


        const modeText = {

            clinic: "In-clinic consultation",

            video: "Video consultation"

        };


        // ---------------------------------------------
        // SHOW RESULT
        // ---------------------------------------------

        conciergeResult.innerHTML = `

            <div class="result-card">

                <div class="result-icon">
                    <i class="fa-solid ${recommendation.icon}"></i>
                </div>


                <span class="section-label">
                    YOUR SUGGESTED CARE PATH
                </span>


                <h3>
                    ${recommendation.department}
                </h3>


                <p>
                    Based on your selections, this demo
                    recommends starting with the
                    ${recommendation.department} department.
                </p>


                <div class="recommendation-doctor">

                    <div class="recommendation-doctor-icon">
                        <i class="fa-solid fa-user-doctor"></i>
                    </div>

                    <div>

                        <small>
                            Suggested Specialist
                        </small>

                        <strong>
                            ${recommendation.doctor}
                        </strong>

                    </div>

                </div>


                <div class="recommendation-tags">

                    <span>
                        <i class="fa-solid fa-clock"></i>
                        ${urgencyText[urgency]}
                    </span>


                    <span>
                        <i class="fa-solid ${
                            mode === "video"
                                ? "fa-video"
                                : "fa-hospital"
                        }"></i>

                        ${modeText[mode]}
                    </span>

                </div>


                <button
                    type="button"
                    class="submit-btn concierge-book-btn"
                >

                    <i class="fa-solid fa-calendar-check"></i>

                    Continue to Booking

                    <i class="fa-solid fa-arrow-right"></i>

                </button>


                <div class="concierge-disclaimer">

                    <i class="fa-solid fa-circle-info"></i>

                    <span>
                        This is department-routing guidance
                        for the demo and is not a diagnosis.
                    </span>

                </div>

            </div>

        `;


        // ---------------------------------------------
        // BOOK RECOMMENDED DOCTOR
        // ---------------------------------------------

        const bookButton =
            conciergeResult.querySelector(
                ".concierge-book-btn"
            );


        if (bookButton) {

            bookButton.addEventListener(
                "click",
                () => {

                    const departmentSelect =
                        document.getElementById("department");

                    const doctorSelect =
                        document.getElementById("doctor");


                    // Select department
                    if (departmentSelect) {

                        departmentSelect.value =
                            recommendation.department;

                    }


                    // Populate doctor dropdown
                    if (
                        typeof populateDoctorSelect ===
                        "function"
                    ) {

                        populateDoctorSelect(
                            recommendation.department
                        );

                    }


                    // Select doctor
                    if (doctorSelect) {

                        doctorSelect.value =
                            recommendation.doctor;

                    }


                    // Scroll to appointment
                    const appointment =
                        document.getElementById(
                            "appointment"
                        );


                    if (appointment) {

                        appointment.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }


                    showToast(
                        `${recommendation.doctor} selected for booking.`
                    );

                }
            );

        }


        // Scroll result into view
        setTimeout(() => {

            conciergeResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);


        showToast(
            "Your personalized care path is ready."
        );

    });

}


// ---------------------------------------------
// RESET CONCIERGE
// ---------------------------------------------

if (resetConcierge) {

    resetConcierge.addEventListener(
        "click",
        () => {

            conciergeSelections.concern = "";
            conciergeSelections.urgency = "";
            conciergeSelections.mode = "";


            document
                .querySelectorAll(".concierge-option")
                .forEach((button) => {

                    button.classList.remove(
                        "selected"
                    );

                    button.classList.remove(
                        "active"
                    );

                });


            if (conciergeResult) {

                conciergeResult.innerHTML = `

                    <div class="result-placeholder">

                        <div class="result-placeholder-icon">

                            <i class="fa-solid fa-sparkles"></i>

                        </div>


                        <h3>
                            Your care recommendation
                        </h3>


                        <p>
                            Complete the three steps to discover
                            a suggested department.
                        </p>

                    </div>

                `;

            }


            updateConciergeProgress();


            showToast(
                "Care Concierge reset."
            );

        }
    );

}


// ---------------------------------------------
// HIGHLIGHT MISSING STEP
// ---------------------------------------------

function highlightMissingConciergeStep() {

    const groups = [
        "concern",
        "urgency",
        "mode"
    ];


    const groupNames = {
        concern: "your main concern",
        urgency: "how soon you need care",
        mode: "your consultation mode"
    };


    for (const group of groups) {

        if (!conciergeSelections[group]) {

            const firstButton =
                document.querySelector(
                    `.concierge-option[data-group="${group}"]`
                );


            if (firstButton) {

                firstButton.closest(
                    ".concierge-step"
                )?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }


            showToast(
                `Please select ${groupNames[group]}.`,
                "error"
            );

            break;
        }

    }

}

    /* =====================================================
       AI QUICK CARE SEARCH
    ===================================================== */

    const aiInput = $("#aiInput");
    const aiCheckBtn = $("#aiCheckBtn");
    const aiResult = $("#aiResult");


    const getAiSuggestion = (input) => {

        const text = input.toLowerCase();


        if (
            text.includes("chest") ||
            text.includes("breath") ||
            text.includes("severe")
        ) {
            return {
                department: "Emergency Care",
                doctor: "",
                icon: "fa-truck-medical",
                message:
                    "If you are experiencing a real emergency or severe symptoms, seek immediate medical attention or contact local emergency services such as 112 in India.",
                emergency: true
            };
        }


        if (
            text.includes("heart") ||
            text.includes("cardio")
        ) {
            return {
                department: "Cardiology",
                doctor: "Dr. Aarav Sharma",
                icon: "fa-heart-pulse",
                message:
                    "For this demo search, Cardiology is the suggested department.",
                emergency: false
            };
        }


        if (
            text.includes("headache") ||
            text.includes("migraine") ||
            text.includes("brain")
        ) {
            return {
                department: "Neurology",
                doctor: "Dr. Priya Mehta",
                icon: "fa-head-side-virus",
                message:
                    "For this demo search, Neurology is the suggested department.",
                emergency: false
            };
        }


        if (
            text.includes("tooth") ||
            text.includes("dental") ||
            text.includes("teeth")
        ) {
            return {
                department: "Dental Care",
                doctor: "Dr. Kabir Verma",
                icon: "fa-tooth",
                message:
                    "For this demo search, Dental Care is the suggested department.",
                emergency: false
            };
        }


        if (
            text.includes("child") ||
            text.includes("baby") ||
            text.includes("kid")
        ) {
            return {
                department: "Pediatrics",
                doctor: "Dr. Riya Kapoor",
                icon: "fa-child",
                message:
                    "For this demo search, Pediatrics is the suggested department.",
                emergency: false
            };
        }


        if (
            text.includes("bone") ||
            text.includes("joint") ||
            text.includes("knee") ||
            text.includes("back")
        ) {
            return {
                department: "Orthopedics",
                doctor: "Dr. Neha Singh",
                icon: "fa-bone",
                message:
                    "For this demo search, Orthopedics is the suggested department.",
                emergency: false
            };
        }


        return {
            department: "General Medicine",
            doctor: "Dr. Raj Malhotra",
            icon: "fa-stethoscope",
            message:
                "General Medicine is a general starting point for this demo search.",
            emergency: false
        };
    };


    const runAiSearch = () => {

        const input =
            aiInput?.value.trim();


        if (!input) {
            showToast(
                "Describe what you're looking for first.",
                "error"
            );

            aiInput?.focus();

            return;
        }


        const result =
            getAiSuggestion(input);


        if (!aiResult) return;


        aiResult.innerHTML = `
            <i class="fa-solid ${result.icon}"></i>

            <div>

                <strong>
                    ${result.department}
                </strong>

                <span>
                    ${result.message}
                </span>

                ${
                    result.doctor
                        ? `
                            <button
                                type="button"
                                class="ai-book-btn"
                                data-doctor="${result.doctor}"
                                data-department="${result.department}"
                            >
                                Explore ${result.doctor}
                            </button>
                        `
                        : ""
                }

            </div>
        `;


        $(".ai-book-btn")?.addEventListener(
            "click",
            (event) => {

                const button =
                    event.currentTarget;

                selectDoctorForBooking(
                    button.dataset.doctor,
                    button.dataset.department
                );
            }
        );


        if (result.emergency) {
            aiResult.classList.add("emergency-result");
        } else {
            aiResult.classList.remove("emergency-result");
        }
    };


    aiCheckBtn?.addEventListener(
        "click",
        runAiSearch
    );


    aiInput?.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Enter") {
                runAiSearch();
            }
        }
    );


    /* =====================================================
       HEALTH PACKAGES
    ===================================================== */

    $$(".package-btn").forEach((button) => {

        button.addEventListener("click", () => {

            const packageName =
                button.dataset.package;


            if (!packageName) return;


            showToast(
                `${packageName} selected. Continue to booking.`
            );


            const appointment =
                $("#appointment");


            appointment?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            setTimeout(() => {
                $("#patientName")?.focus();
            }, 700);
        });
    });


    /* =====================================================
       DIGITAL PATIENT ID
    ===================================================== */

    const patientIdModal =
        $("#patientIdModal");


    $("#patientIdButton")?.addEventListener(
        "click",
        () => {

            const appointments =
                getAppointments();


            const latest =
                appointments[appointments.length - 1];


            const nameElement =
                $(".patient-card-name");

            const idElement =
                $(".patient-card-id");


            if (nameElement) {
                nameElement.textContent =
                    latest?.patientName ||
                    "Guest Patient";
            }


            if (idElement) {
                idElement.textContent =
                    latest?.id ||
                    "MC-000000";
            }


            openModal(patientIdModal);
        }
    );


    /* =====================================================
       HEALTH RECORD UPLOAD
    ===================================================== */

    const recordInput =
        $("#recordInput");


    $("#uploadRecordBtn")?.addEventListener(
        "click",
        () => {
            recordInput?.click();
        }
    );


    recordInput?.addEventListener(
        "change",
        () => {

            const file =
                recordInput.files?.[0];


            if (!file) return;


            showToast(
                `${file.name} selected for this demo.`
            );


            recordInput.value = "";
        }
    );


    /* =====================================================
       HEALTH REMINDER
    ===================================================== */

    $$(".reminder-toggle").forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "active"
                    );


                    const active =
                        button.classList.contains(
                            "active"
                        );


                    button.innerHTML = active
                        ? `
                            <i class="fa-solid fa-bell"></i>
                            Reminder On
                        `
                        : `
                            <i class="fa-regular fa-bell"></i>
                            Remind Me
                        `;


                    showToast(
                        active
                            ? "Wellness reminder enabled."
                            : "Wellness reminder disabled."
                    );
                }
            );
        }
    );


    /* =====================================================
       MEDICINE REMINDER
    ===================================================== */

    const medicineModal =
        $("#medicineModal");


    $("#medicineBtn")?.addEventListener(
        "click",
        () => {
            openModal(medicineModal);
        }
    );


    $("#closeMedicineModal")?.addEventListener(
        "click",
        () => {
            closeModal(medicineModal);
        }
    );


    $("#saveMedicineBtn")?.addEventListener(
        "click",
        () => {

            const medicineName =
                $("#medicineName")?.value.trim();

            const medicineTime =
                $("#medicineTime")?.value;


            if (!medicineName || !medicineTime) {
                showToast(
                    "Please enter medicine name and time.",
                    "error"
                );

                return;
            }


            const reminder = {
                name: medicineName,
                time: medicineTime
            };


            localStorage.setItem(
                "medicareMedicineReminder",
                JSON.stringify(reminder)
            );


            closeModal(medicineModal);


            $("#medicineName").value = "";
            $("#medicineTime").value = "";


            showToast(
                `Reminder saved for ${medicineName}.`
            );
        }
    );


    /* =====================================================
       EMERGENCY SOS
    ===================================================== */

    const emergencyModal =
        $("#emergencyModal");


    const openEmergency = () => {
        openModal(emergencyModal);
    };


    $("#emergencyButton")?.addEventListener(
        "click",
        openEmergency
    );


    $("#floatingSos")?.addEventListener(
        "click",
        openEmergency
    );


    $("#closeEmergencyModal")?.addEventListener(
        "click",
        () => closeModal(emergencyModal)
    );


    /* =====================================================
       TELECONSULT MODAL
    ===================================================== */

    const teleconsultModal =
        $("#teleconsultModal");


    $("#closeTeleconsult")?.addEventListener(
        "click",
        () => closeModal(teleconsultModal)
    );


    /* =====================================================
       FAQ
    ===================================================== */

    $$(".faq-question").forEach(
        (question) => {

            question.addEventListener(
                "click",
                () => {

                    const item =
                        question.closest(".faq-item");


                    if (!item) return;


                    const isOpen =
                        item.classList.contains("active");


                    $$(".faq-item").forEach(
                        (faq) => {
                            faq.classList.remove(
                                "active"
                            );
                        }
                    );


                    if (!isOpen) {
                        item.classList.add("active");
                    }
                }
            );
        }
    );


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        $$(".counter");


    const animateCounter = (counter) => {

        const target =
            Number(counter.dataset.target || 0);


        let current = 0;

        const duration = 1600;

        const stepTime =
            Math.max(
                20,
                Math.floor(duration / target)
            );


        const timer =
            setInterval(() => {

                current += Math.ceil(
                    target / 80
                );


                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }


                counter.textContent =
                    current.toLocaleString();
            }, stepTime);
    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {
                                animateCounter(
                                    entry.target
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(
            (counter) =>
                counterObserver.observe(counter)
        );

    } else {
        counters.forEach(
            animateCounter
        );
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        $(
            ".section-heading, .doctor-card, .package-card, .health-side-card, .visit-card, .tip-card, .testimonial-card, .faq-item"
        );


    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) =>
                revealObserver.observe(element)
        );
    } else {
        revealElements.forEach(
            (element) =>
                element.classList.add("visible")
        );
    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        $("#backTop");


    window.addEventListener(
        "scroll",
        () => {

            if (!backTop) return;


            if (window.scrollY > 500) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }
        }
    );


    backTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );


    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const sections =
        $$("main section[id]");


    const updateActiveNav =
        () => {

            let currentSection = "home";


            sections.forEach((section) => {

                const top =
                    section.offsetTop - 160;

                const bottom =
                    top + section.offsetHeight;


                if (
                    window.scrollY >= top &&
                    window.scrollY < bottom
                ) {
                    currentSection =
                        section.id;
                }
            });


            $$(".nav-link").forEach(
                (link) => {

                    const target =
                        link.getAttribute("href")
                            ?.replace("#", "");


                    link.classList.toggle(
                        "active",
                        target === currentSection
                    );
                }
            );
        };


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ===================================================== */

    $$('a[href^="#"]').forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            );
        }
    );


    /* =====================================================
       MODAL BACKDROP
    ===================================================== */

    $$(".modal").forEach(
        (modal) => {

            modal.addEventListener(
                "click",
                (event) => {

                    if (
                        event.target === modal
                    ) {
                        closeModal(modal);
                    }
                }
            );
        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            $$(".modal.active").forEach(
                (modal) => {
                    closeModal(modal);
                }
            );


            navMenu?.classList.remove(
                "active"
            );


            const icon =
                menuToggle?.querySelector("i");


            if (icon) {
                icon.className =
                    "fa-solid fa-bars";
            }
        }
    );


    /* =====================================================
       PHONE INPUT
    ===================================================== */

    $("#patientPhone")?.addEventListener(
        "input",
        (event) => {

            event.target.value =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
        }
    );


    /* =====================================================
       TELECONSULT DEMO TRIGGER
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    ".teleconsult-btn"
                );


            if (!button) return;


            openModal(teleconsultModal);
        }
    );


    /* =====================================================
       INITIAL UI STATE
    ===================================================== */

    updateActiveNav();


    console.log(
        "MediCare 2.0 initialized successfully."
    );

});
