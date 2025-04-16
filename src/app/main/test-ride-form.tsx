"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Info,
  BikeIcon as Motorcycle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

// Sample bike data
const bikeModels = [
  { id: "cbr1000rr", name: "CBR1000RR Fireblade", category: "Sport" },
  { id: "cbr600rr", name: "CBR600RR", category: "Sport" },
  { id: "cbr500r", name: "CBR500R", category: "Sport" },
  { id: "africatwin", name: "Africa Twin", category: "Adventure" },
  { id: "nc750x", name: "NC750X", category: "Adventure" },
  { id: "cb500x", name: "CB500X", category: "Adventure" },
  { id: "rebel1100", name: "Rebel 1100", category: "Cruiser" },
  { id: "rebel500", name: "Rebel 500", category: "Cruiser" },
  { id: "rebel300", name: "Rebel 300", category: "Cruiser" },
  { id: "goldwing", name: "Gold Wing Tour", category: "Touring" },
  { id: "nt1100", name: "NT1100", category: "Touring" },
  { id: "cb1000r", name: "CB1000R", category: "Naked" },
  { id: "cb650r", name: "CB650R", category: "Naked" },
  { id: "cb300r", name: "CB300R", category: "Naked" },
];

// Available dealerships
const dealerships = [
  {
    id: "dealer1",
    name: "Honda Powersports Downtown",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "dealer2",
    name: "Honda Motorcycle Center",
    address: "456 Park Ave, Los Angeles, CA 90001",
  },
  {
    id: "dealer3",
    name: "City Honda Powersports",
    address: "789 Market St, Chicago, IL 60007",
  },
  {
    id: "dealer4",
    name: "Metro Honda Motorcycles",
    address: "321 Oak Rd, Houston, TX 77001",
  },
  {
    id: "dealer5",
    name: "Capital Honda",
    address: "555 Pine Blvd, Miami, FL 33101",
  },
];

// Available time slots
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

// Form schema for validation
const formSchema = z.object({
  // Step 1: Personal Information
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),

  // Step 2: Motorcycle Selection
  bikeModel: z.string({ required_error: "Please select a motorcycle model" }),
  dealership: z.string({ required_error: "Please select a dealership" }),

  // Step 3: Schedule
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),

  // Step 4: Experience
  licenseType: z.string({ required_error: "Please select your license type" }),
  ridingExperience: z.string({
    required_error: "Please select your riding experience",
  }),
  additionalInfo: z.string().optional(),

  // Terms
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function TestRideForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bikeModel: "",
      dealership: "",
      licenseType: "",
      ridingExperience: "",
      additionalInfo: "",
      termsAccepted: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = form;

  // Watch form values for summary
  const watchedValues = watch();

  // Handle next step
  const handleNext = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];

    // Determine which fields to validate based on current step
    switch (step) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "email", "phone"];
        break;
      case 2:
        fieldsToValidate = ["bikeModel", "dealership"];
        break;
      case 3:
        fieldsToValidate = ["date", "time"];
        break;
      case 4:
        fieldsToValidate = ["licenseType", "ridingExperience", "termsAccepted"];
        break;
    }

    // Validate the fields for the current step
    const isValid = await trigger(fieldsToValidate as any);

    if (isValid) {
      if (step < 5) {
        setStep(step + 1);
      }
    }
  };

  // Handle back step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Get selected bike and dealership names for summary
  const selectedBike = bikeModels.find(
    (bike) => bike.id === watchedValues.bikeModel
  );
  const selectedDealership = dealerships.find(
    (dealer) => dealer.id === watchedValues.dealership
  );

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className='max-w-3xl mx-auto'>
      {!isSubmitted ? (
        <Card className='border-2'>
          <CardHeader>
            <CardTitle className='text-2xl'>Schedule a Test Ride</CardTitle>
            <CardDescription>
              Experience the thrill of riding a Honda motorcycle
            </CardDescription>

            {/* Progress indicator */}
            <div className='mt-4'>
              <div className='flex justify-between mb-2'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      step === i
                        ? "bg-red-600 text-white"
                        : step > i
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className='w-full bg-gray-200 h-2 rounded-full'>
                <div
                  className='bg-red-600 h-2 rounded-full transition-all duration-300'
                  style={{ width: `${(step - 1) * 25}%` }}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode='wait'>
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <motion.div
                    key='step1'
                    initial='hidden'
                    animate='visible'
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    variants={fadeInUp}
                    className='space-y-4'
                  >
                    <h3 className='text-lg font-medium'>
                      Personal Information
                    </h3>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='firstName'>First Name</Label>
                        <Input
                          id='firstName'
                          {...register("firstName")}
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && (
                          <p className='text-red-500 text-sm'>
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='lastName'>Last Name</Label>
                        <Input
                          id='lastName'
                          {...register("lastName")}
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && (
                          <p className='text-red-500 text-sm'>
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className='text-red-500 text-sm'>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone Number</Label>
                      <Input
                        id='phone'
                        type='tel'
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className='text-red-500 text-sm'>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Motorcycle Selection */}
                {step === 2 && (
                  <motion.div
                    key='step2'
                    initial='hidden'
                    animate='visible'
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    variants={fadeInUp}
                    className='space-y-4'
                  >
                    <h3 className='text-lg font-medium'>
                      Select Your Motorcycle
                    </h3>
                    <div className='space-y-2'>
                      <Label htmlFor='bikeModel'>Motorcycle Model</Label>
                      <Select
                        value={watchedValues.bikeModel}
                        onValueChange={(value) => setValue("bikeModel", value)}
                      >
                        <SelectTrigger
                          className={errors.bikeModel ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder='Select a motorcycle' />
                        </SelectTrigger>
                        <SelectContent>
                          {bikeModels.map((bike) => (
                            <SelectItem key={bike.id} value={bike.id}>
                              {bike.name} ({bike.category})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.bikeModel && (
                        <p className='text-red-500 text-sm'>
                          {errors.bikeModel.message}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='dealership'>Preferred Dealership</Label>
                      <Select
                        value={watchedValues.dealership}
                        onValueChange={(value) => setValue("dealership", value)}
                      >
                        <SelectTrigger
                          className={errors.dealership ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder='Select a dealership' />
                        </SelectTrigger>
                        <SelectContent>
                          {dealerships.map((dealer) => (
                            <SelectItem key={dealer.id} value={dealer.id}>
                              {dealer.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.dealership && (
                        <p className='text-red-500 text-sm'>
                          {errors.dealership.message}
                        </p>
                      )}
                    </div>

                    {selectedDealership && (
                      <div className='p-4 bg-gray-50 rounded-lg'>
                        <p className='text-sm text-muted-foreground'>
                          {selectedDealership.address}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Schedule */}
                {step === 3 && (
                  <motion.div
                    key='step3'
                    initial='hidden'
                    animate='visible'
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    variants={fadeInUp}
                    className='space-y-4'
                  >
                    <h3 className='text-lg font-medium'>
                      Schedule Your Test Ride
                    </h3>
                    <div className='space-y-2'>
                      <Label>Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !watchedValues.date && "text-muted-foreground",
                              errors.date && "border-red-500"
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {watchedValues.date
                              ? format(watchedValues.date, "PPP")
                              : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                          <Calendar
                            mode='single'
                            selected={watchedValues.date}
                            onSelect={(date) => setValue("date", date as Date)}
                            disabled={
                              (date) =>
                                date <
                                  new Date(new Date().setHours(0, 0, 0, 0)) || // No past dates
                                date >
                                  new Date(
                                    new Date().setMonth(
                                      new Date().getMonth() + 2
                                    )
                                  ) // Max 2 months ahead
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date && (
                        <p className='text-red-500 text-sm'>
                          {errors.date.message}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label>Preferred Time</Label>
                      <Select
                        value={watchedValues.time}
                        onValueChange={(value) => setValue("time", value)}
                      >
                        <SelectTrigger
                          className={errors.time ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder='Select a time slot' />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.time && (
                        <p className='text-red-500 text-sm'>
                          {errors.time.message}
                        </p>
                      )}
                    </div>

                    <div className='p-4 bg-yellow-50 rounded-lg flex items-start gap-2'>
                      <Info className='h-5 w-5 text-yellow-500 mt-0.5' />
                      <p className='text-sm'>
                        Test rides are approximately 30 minutes long. Please
                        arrive 15 minutes before your scheduled time with a
                        valid motorcycle license.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Experience */}
                {step === 4 && (
                  <motion.div
                    key='step4'
                    initial='hidden'
                    animate='visible'
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    variants={fadeInUp}
                    className='space-y-4'
                  >
                    <h3 className='text-lg font-medium'>Riding Experience</h3>
                    <div className='space-y-2'>
                      <Label>License Type</Label>
                      <RadioGroup
                        value={watchedValues.licenseType}
                        onValueChange={(value) =>
                          setValue("licenseType", value)
                        }
                        className='grid grid-cols-1 gap-2'
                      >
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='full' id='license-full' />
                          <Label
                            htmlFor='license-full'
                            className='cursor-pointer'
                          >
                            Full Motorcycle License
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='provisional'
                            id='license-provisional'
                          />
                          <Label
                            htmlFor='license-provisional'
                            className='cursor-pointer'
                          >
                            Provisional/Learner License
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='international'
                            id='license-international'
                          />
                          <Label
                            htmlFor='license-international'
                            className='cursor-pointer'
                          >
                            International License
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.licenseType && (
                        <p className='text-red-500 text-sm'>
                          {errors.licenseType.message}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label>Riding Experience</Label>
                      <RadioGroup
                        value={watchedValues.ridingExperience}
                        onValueChange={(value) =>
                          setValue("ridingExperience", value)
                        }
                        className='grid grid-cols-1 gap-2'
                      >
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='beginner' id='exp-beginner' />
                          <Label
                            htmlFor='exp-beginner'
                            className='cursor-pointer'
                          >
                            Beginner (0-2 years)
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='intermediate'
                            id='exp-intermediate'
                          />
                          <Label
                            htmlFor='exp-intermediate'
                            className='cursor-pointer'
                          >
                            Intermediate (2-5 years)
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value='experienced'
                            id='exp-experienced'
                          />
                          <Label
                            htmlFor='exp-experienced'
                            className='cursor-pointer'
                          >
                            Experienced (5+ years)
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.ridingExperience && (
                        <p className='text-red-500 text-sm'>
                          {errors.ridingExperience.message}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='additionalInfo'>
                        Additional Information (Optional)
                      </Label>
                      <Textarea
                        id='additionalInfo'
                        placeholder='Any specific questions or requirements for your test ride?'
                        {...register("additionalInfo")}
                      />
                    </div>

                    <div className='pt-4'>
                      <div className='flex items-start space-x-2'>
                        <Checkbox
                          id='terms'
                          checked={watchedValues.termsAccepted}
                          onCheckedChange={(checked) =>
                            setValue("termsAccepted", checked as boolean)
                          }
                        />
                        <div className='grid gap-1.5 leading-none'>
                          <label
                            htmlFor='terms'
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            I accept the terms and conditions
                          </label>
                          <p className='text-sm text-muted-foreground'>
                            I confirm that I have a valid motorcycle license and
                            will bring it with me to the test ride.
                          </p>
                        </div>
                      </div>
                      {errors.termsAccepted && (
                        <p className='text-red-500 text-sm mt-2'>
                          {errors.termsAccepted.message}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Summary */}
                {step === 5 && (
                  <motion.div
                    key='step5'
                    initial='hidden'
                    animate='visible'
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    variants={fadeInUp}
                    className='space-y-4'
                  >
                    <h3 className='text-lg font-medium'>
                      Review Your Test Ride Details
                    </h3>

                    <div className='space-y-4'>
                      <div className='bg-gray-50 p-4 rounded-lg space-y-3'>
                        <div className='flex items-center gap-2'>
                          <Motorcycle className='h-5 w-5 text-red-600' />
                          <h4 className='font-medium'>Motorcycle</h4>
                        </div>
                        <p>{selectedBike?.name || "Not selected"}</p>
                      </div>

                      <div className='bg-gray-50 p-4 rounded-lg space-y-3'>
                        <div className='flex items-center gap-2'>
                          <CalendarIcon className='h-5 w-5 text-red-600' />
                          <h4 className='font-medium'>Date & Time</h4>
                        </div>
                        <p>
                          {watchedValues.date
                            ? format(watchedValues.date, "PPPP")
                            : "Not selected"}{" "}
                          at {watchedValues.time || "Not selected"}
                        </p>
                      </div>

                      <div className='bg-gray-50 p-4 rounded-lg space-y-3'>
                        <div className='flex items-center gap-2'>
                          <Info className='h-5 w-5 text-red-600' />
                          <h4 className='font-medium'>Dealership</h4>
                        </div>
                        <div>
                          <p>{selectedDealership?.name || "Not selected"}</p>
                          <p className='text-sm text-muted-foreground'>
                            {selectedDealership?.address}
                          </p>
                        </div>
                      </div>

                      <div className='bg-gray-50 p-4 rounded-lg space-y-3'>
                        <div className='flex items-center gap-2'>
                          <Info className='h-5 w-5 text-red-600' />
                          <h4 className='font-medium'>Personal Information</h4>
                        </div>
                        <div className='space-y-1'>
                          <p>
                            {watchedValues.firstName} {watchedValues.lastName}
                          </p>
                          <p>{watchedValues.email}</p>
                          <p>{watchedValues.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className='p-4 bg-yellow-50 rounded-lg flex items-start gap-2'>
                      <Info className='h-5 w-5 text-yellow-500 mt-0.5' />
                      <p className='text-sm'>
                        Please bring your valid motorcycle license and
                        appropriate riding gear for your test ride. A dealership
                        representative will contact you to confirm your
                        appointment.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </CardContent>

          <CardFooter className='flex justify-between'>
            {step > 1 && (
              <Button
                type='button'
                variant='outline'
                onClick={handleBack}
                disabled={isSubmitting}
              >
                <ChevronLeft className='mr-2 h-4 w-4' /> Back
              </Button>
            )}
            {step === 1 && <div />}

            {step < 5 ? (
              <Button
                type='button'
                onClick={handleNext}
                className='bg-red-600 hover:bg-red-700'
              >
                Next <ChevronRight className='ml-2 h-4 w-4' />
              </Button>
            ) : (
              <Button
                type='button'
                onClick={handleSubmit(onSubmit)}
                className='bg-red-600 hover:bg-red-700'
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Schedule Test Ride"}
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className='border-2 border-green-500'>
            <CardHeader>
              <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <CardTitle className='text-2xl text-center'>
                Test Ride Scheduled!
              </CardTitle>
              <CardDescription className='text-center'>
                Your test ride request has been submitted successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className='text-center space-y-4'>
              <p>
                We've sent a confirmation email to{" "}
                <span className='font-medium'>{watchedValues.email}</span> with
                all the details.
              </p>
              <p>
                A representative from {selectedDealership?.name} will contact
                you shortly to confirm your appointment.
              </p>
              <div className='p-4 bg-gray-50 rounded-lg mt-4'>
                <div className='flex justify-between mb-2'>
                  <span className='text-muted-foreground'>Motorcycle:</span>
                  <span className='font-medium'>{selectedBike?.name}</span>
                </div>
                <div className='flex justify-between mb-2'>
                  <span className='text-muted-foreground'>Date:</span>
                  <span className='font-medium'>
                    {watchedValues.date
                      ? format(watchedValues.date, "PPP")
                      : ""}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Time:</span>
                  <span className='font-medium'>{watchedValues.time}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Button
                onClick={() => (window.location.href = "/")}
                className='bg-red-600 hover:bg-red-700'
              >
                Return to Homepage
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
