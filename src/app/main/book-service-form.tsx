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
  Clock,
  Info,
  Wrench,
  AlertTriangle,
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

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample bike models
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

// Available dealerships/service centers
const serviceLocations = [
  {
    id: "service1",
    name: "Honda Service Center Downtown",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "service2",
    name: "Honda Motorcycle Service",
    address: "456 Park Ave, Los Angeles, CA 90001",
  },
  {
    id: "service3",
    name: "City Honda Service",
    address: "789 Market St, Chicago, IL 60007",
  },
  {
    id: "service4",
    name: "Metro Honda Service Center",
    address: "321 Oak Rd, Houston, TX 77001",
  },
  {
    id: "service5",
    name: "Capital Honda Service",
    address: "555 Pine Blvd, Miami, FL 33101",
  },
];

// Available time slots
const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

// Service types
const serviceTypes = [
  {
    id: "regular",
    name: "Regular Maintenance",
    description: "Oil change, filter replacement, and basic inspection",
    estimatedTime: "1-2 hours",
    price: "$150-$250",
  },
  {
    id: "major",
    name: "Major Service",
    description:
      "Comprehensive service including valve clearance check, cooling system flush, and more",
    estimatedTime: "3-5 hours",
    price: "$350-$600",
  },
  {
    id: "tires",
    name: "Tire Replacement",
    description: "Removal and installation of new tires, including balancing",
    estimatedTime: "1-2 hours",
    price: "$250-$450 (plus tire cost)",
  },
  {
    id: "diagnostic",
    name: "Diagnostic Check",
    description:
      "Computer diagnostic to identify issues with electronic systems",
    estimatedTime: "1 hour",
    price: "$100-$150",
  },
  {
    id: "repair",
    name: "Repair Service",
    description: "General repairs for specific issues with your motorcycle",
    estimatedTime: "Varies",
    price: "Varies based on issue",
  },
];

// Additional services
const additionalServices = [
  { id: "wash", name: "Motorcycle Wash & Detail", price: "$50" },
  { id: "brake", name: "Brake Fluid Change", price: "$80" },
  { id: "chain", name: "Chain Adjustment & Lubrication", price: "$45" },
  {
    id: "battery",
    name: "Battery Check & Replacement",
    price: "$25 (check) / $120+ (replacement)",
  },
  { id: "suspension", name: "Suspension Check & Adjustment", price: "$75" },
];

// Form schema for validation
const formSchema = z.object({
  // Step 1: Vehicle Information
  bikeModel: z.string({
    required_error: "Please select your motorcycle model",
  }),
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Please enter a valid year (e.g., 2023)" }),
  vin: z.string().optional(),
  mileage: z.string().min(1, { message: "Please enter the current mileage" }),
  registrationNumber: z.string().optional(),

  // Step 2: Service Selection
  serviceType: z.string({ required_error: "Please select a service type" }),
  additionalServices: z.array(z.string()).optional(),

  // Step 3: Schedule
  serviceLocation: z.string({
    required_error: "Please select a service location",
  }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),

  // Step 4: Customer Information
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),

  // Step 5: Additional Information
  issues: z.string().optional(),
  dropOff: z.boolean().optional(),
  waitOnsite: z.boolean().optional(),

  // Terms
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function BookServiceForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bikeModel: "",
      year: "",
      vin: "",
      mileage: "",
      registrationNumber: "",
      serviceType: "",
      additionalServices: [],
      serviceLocation: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      issues: "",
      dropOff: false,
      waitOnsite: false,
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
        fieldsToValidate = ["bikeModel", "year", "mileage"];
        break;
      case 2:
        fieldsToValidate = ["serviceType"];
        break;
      case 3:
        fieldsToValidate = ["serviceLocation", "date", "time"];
        break;
      case 4:
        fieldsToValidate = ["firstName", "lastName", "email", "phone"];
        break;
      case 5:
        fieldsToValidate = ["termsAccepted"];
        break;
    }

    // Validate the fields for the current step
    const isValid = await trigger(fieldsToValidate as any);

    if (isValid) {
      if (step < 6) {
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

  // Toggle additional service selection
  const toggleAdditionalService = (serviceId: string) => {
    const currentServices = watchedValues.additionalServices || [];

    if (currentServices.includes(serviceId)) {
      setValue(
        "additionalServices",
        currentServices.filter((id) => id !== serviceId)
      );
    } else {
      setValue("additionalServices", [...currentServices, serviceId]);
    }
  };

  // Get selected service and location names for summary
  const selectedBike = bikeModels.find(
    (bike) => bike.id === watchedValues.bikeModel
  );
  const selectedService = serviceTypes.find(
    (service) => service.id === watchedValues.serviceType
  );
  const selectedLocation = serviceLocations.find(
    (location) => location.id === watchedValues.serviceLocation
  );
  const selectedAdditionalServices = additionalServices.filter((service) =>
    watchedValues.additionalServices?.includes(service.id)
  );

  // Calculate estimated total cost
  const calculateEstimatedCost = () => {
    if (!selectedService) return "Varies";

    const baseCost = selectedService.price;

    if (selectedAdditionalServices.length > 0) {
      return `${baseCost} + additional services`;
    }

    return baseCost;
  };

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
            <CardTitle className='text-2xl'>Book a Service</CardTitle>
            <CardDescription>
              Schedule maintenance or repairs for your Honda motorcycle
            </CardDescription>

            {/* Progress indicator */}
            <div className='mt-4'>
              <div className='flex justify-between mb-2'>
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
                  style={{ width: `${(step - 1) * 20}%` }}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode='wait'>
                {/* Step 1: Vehicle Information */}
                {step === 1 && (
                  <motion.div
                    key='step1'
                    initial='hidden'
                    animate='visible'
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    variants={fadeInUp}
                    className='space-y-4'
                  >
                    <h3 className='text-lg font-medium'>Vehicle Information</h3>

                    <div className='space-y-2'>
                      <Label htmlFor='bikeModel'>Motorcycle Model</Label>
                      <Select
                        value={watchedValues.bikeModel}
                        onValueChange={(value) => setValue("bikeModel", value)}
                      >
                        <SelectTrigger
                          className={errors.bikeModel ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder='Select your motorcycle model' />
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

                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='year'>Year</Label>
                        <Input
                          id='year'
                          placeholder='e.g., 2023'
                          {...register("year")}
                          className={errors.year ? "border-red-500" : ""}
                        />
                        {errors.year && (
                          <p className='text-red-500 text-sm'>
                            {errors.year.message}
                          </p>
                        )}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='mileage'>Current Mileage</Label>
                        <Input
                          id='mileage'
                          placeholder='e.g., 5000'
                          {...register("mileage")}
                          className={errors.mileage ? "border-red-500" : ""}
                        />
                        {errors.mileage && (
                          <p className='text-red-500 text-sm'>
                            {errors.mileage.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='vin'>VIN (Optional)</Label>
                        <Input
                          id='vin'
                          placeholder='Vehicle Identification Number'
                          {...register("vin")}
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='registrationNumber'>
                          Registration Number (Optional)
                        </Label>
                        <Input
                          id='registrationNumber'
                          placeholder='License plate number'
                          {...register("registrationNumber")}
                        />
                      </div>
                    </div>

                    <div className='p-4 bg-blue-50 rounded-lg flex items-start gap-2'>
                      <Info className='h-5 w-5 text-blue-500 mt-0.5' />
                      <p className='text-sm'>
                        Providing accurate vehicle information helps our
                        technicians prepare for your service appointment.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Service Selection */}
                {step === 2 && (
                  <motion.div
                    key='step2'
                    initial='hidden'
                    animate='visible'
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    variants={fadeInUp}
                    className='space-y-4'
                  >
                    <h3 className='text-lg font-medium'>Service Selection</h3>

                    <div className='space-y-2'>
                      <Label>Service Type</Label>
                      <RadioGroup
                        value={watchedValues.serviceType}
                        onValueChange={(value) =>
                          setValue("serviceType", value)
                        }
                        className='grid grid-cols-1 gap-3'
                      >
                        {serviceTypes.map((service) => (
                          <div
                            key={service.id}
                            className={`flex flex-col border rounded-lg p-4 cursor-pointer transition-all ${
                              watchedValues.serviceType === service.id
                                ? "border-red-600 bg-red-50"
                                : "hover:border-gray-400"
                            }`}
                            onClick={() => setValue("serviceType", service.id)}
                          >
                            <div className='flex items-start gap-2'>
                              <RadioGroupItem
                                value={service.id}
                                id={`service-${service.id}`}
                                className='mt-1'
                              />
                              <div className='flex-1'>
                                <Label
                                  htmlFor={`service-${service.id}`}
                                  className='text-base font-medium cursor-pointer'
                                >
                                  {service.name}
                                </Label>
                                <p className='text-sm text-muted-foreground mt-1'>
                                  {service.description}
                                </p>
                                <div className='flex flex-wrap gap-x-4 gap-y-1 mt-2'>
                                  <span className='text-xs flex items-center gap-1'>
                                    <Clock className='h-3 w-3' />{" "}
                                    {service.estimatedTime}
                                  </span>
                                  <span className='text-xs flex items-center gap-1'>
                                    <span className='font-medium'>
                                      Est. Cost:
                                    </span>{" "}
                                    {service.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                      {errors.serviceType && (
                        <p className='text-red-500 text-sm'>
                          {errors.serviceType.message}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2 pt-4'>
                      <Label>Additional Services (Optional)</Label>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2'>
                        {additionalServices.map((service) => (
                          <div
                            key={service.id}
                            className={`flex items-start gap-2 border rounded-lg p-3 cursor-pointer transition-all ${
                              watchedValues.additionalServices?.includes(
                                service.id
                              )
                                ? "border-red-600 bg-red-50"
                                : "hover:border-gray-400"
                            }`}
                            onClick={() => toggleAdditionalService(service.id)}
                          >
                            <Checkbox
                              id={`additional-${service.id}`}
                              checked={watchedValues.additionalServices?.includes(
                                service.id
                              )}
                              onCheckedChange={() =>
                                toggleAdditionalService(service.id)
                              }
                              className='mt-1'
                            />
                            <div>
                              <Label
                                htmlFor={`additional-${service.id}`}
                                className='cursor-pointer'
                              >
                                {service.name}
                              </Label>
                              <p className='text-xs text-muted-foreground mt-1'>
                                {service.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
                      Schedule Your Service
                    </h3>

                    <div className='space-y-2'>
                      <Label htmlFor='serviceLocation'>Service Location</Label>
                      <Select
                        value={watchedValues.serviceLocation}
                        onValueChange={(value) =>
                          setValue("serviceLocation", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errors.serviceLocation ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder='Select a service center' />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceLocations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.serviceLocation && (
                        <p className='text-red-500 text-sm'>
                          {errors.serviceLocation.message}
                        </p>
                      )}
                    </div>

                    {selectedLocation && (
                      <div className='p-4 bg-gray-50 rounded-lg'>
                        <p className='text-sm text-muted-foreground'>
                          {selectedLocation.address}
                        </p>
                      </div>
                    )}

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
                                  ) || // Max 2 months ahead
                                date.getDay() === 0 // No Sundays
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
                      <AlertTriangle className='h-5 w-5 text-yellow-500 mt-0.5' />
                      <p className='text-sm'>
                        Service appointments are subject to availability. A
                        service advisor will confirm your appointment time.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Customer Information */}
                {step === 4 && (
                  <motion.div
                    key='step4'
                    initial='hidden'
                    animate='visible'
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    variants={fadeInUp}
                    className='space-y-4'
                  >
                    <h3 className='text-lg font-medium'>
                      Customer Information
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

                {/* Step 5: Additional Information */}
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
                      Additional Information
                    </h3>

                    <div className='space-y-2'>
                      <Label htmlFor='issues'>
                        Describe any issues or special requests
                      </Label>
                      <Textarea
                        id='issues'
                        placeholder='Please describe any specific issues with your motorcycle or special requests for the service'
                        {...register("issues")}
                        className='min-h-[100px]'
                      />
                    </div>

                    <div className='space-y-3 pt-2'>
                      <div className='flex items-start space-x-2'>
                        <Checkbox
                          id='dropOff'
                          checked={watchedValues.dropOff}
                          onCheckedChange={(checked) =>
                            setValue("dropOff", checked as boolean)
                          }
                        />
                        <div className='grid gap-1.5 leading-none'>
                          <label
                            htmlFor='dropOff'
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            Early drop-off
                          </label>
                          <p className='text-sm text-muted-foreground'>
                            I would like to drop off my motorcycle before the
                            service center opens
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start space-x-2'>
                        <Checkbox
                          id='waitOnsite'
                          checked={watchedValues.waitOnsite}
                          onCheckedChange={(checked) =>
                            setValue("waitOnsite", checked as boolean)
                          }
                        />
                        <div className='grid gap-1.5 leading-none'>
                          <label
                            htmlFor='waitOnsite'
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            Wait on-site
                          </label>
                          <p className='text-sm text-muted-foreground'>
                            I would like to wait at the service center while my
                            motorcycle is being serviced
                          </p>
                        </div>
                      </div>
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
                            I understand that additional costs may be incurred
                            if additional issues are found during service.
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

                {/* Step 6: Summary */}
                {step === 6 && (
                  <motion.div
                    key='step6'
                    initial='hidden'
                    animate='visible'
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    variants={fadeInUp}
                    className='space-y-4'
                  >
                    <h3 className='text-lg font-medium'>
                      Review Your Service Booking
                    </h3>

                    <Accordion type='single' collapsible className='w-full'>
                      <AccordionItem value='vehicle'>
                        <AccordionTrigger className='text-base font-medium'>
                          Vehicle Information
                        </AccordionTrigger>
                        <AccordionContent className='space-y-2'>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Model:
                            </span>
                            <span className='font-medium'>
                              {selectedBike?.name || "Not selected"}
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>Year:</span>
                            <span>{watchedValues.year}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Mileage:
                            </span>
                            <span>{watchedValues.mileage} miles</span>
                          </div>
                          {watchedValues.vin && (
                            <div className='flex justify-between'>
                              <span className='text-muted-foreground'>
                                VIN:
                              </span>
                              <span>{watchedValues.vin}</span>
                            </div>
                          )}
                          {watchedValues.registrationNumber && (
                            <div className='flex justify-between'>
                              <span className='text-muted-foreground'>
                                Registration:
                              </span>
                              <span>{watchedValues.registrationNumber}</span>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value='service'>
                        <AccordionTrigger className='text-base font-medium'>
                          Service Details
                        </AccordionTrigger>
                        <AccordionContent className='space-y-2'>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Service Type:
                            </span>
                            <span className='font-medium'>
                              {selectedService?.name || "Not selected"}
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Estimated Time:
                            </span>
                            <span>{selectedService?.estimatedTime}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Estimated Cost:
                            </span>
                            <span>{calculateEstimatedCost()}</span>
                          </div>

                          {selectedAdditionalServices.length > 0 && (
                            <div className='mt-2'>
                              <span className='text-muted-foreground'>
                                Additional Services:
                              </span>
                              <div className='flex flex-wrap gap-2 mt-1'>
                                {selectedAdditionalServices.map((service) => (
                                  <Badge key={service.id} variant='secondary'>
                                    {service.name} ({service.price})
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value='schedule'>
                        <AccordionTrigger className='text-base font-medium'>
                          Schedule
                        </AccordionTrigger>
                        <AccordionContent className='space-y-2'>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Service Center:
                            </span>
                            <span className='font-medium'>
                              {selectedLocation?.name || "Not selected"}
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Address:
                            </span>
                            <span>{selectedLocation?.address}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>Date:</span>
                            <span>
                              {watchedValues.date
                                ? format(watchedValues.date, "PPP")
                                : "Not selected"}
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>Time:</span>
                            <span>{watchedValues.time || "Not selected"}</span>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value='customer'>
                        <AccordionTrigger className='text-base font-medium'>
                          Customer Information
                        </AccordionTrigger>
                        <AccordionContent className='space-y-2'>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>Name:</span>
                            <span>
                              {watchedValues.firstName} {watchedValues.lastName}
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Email:
                            </span>
                            <span>{watchedValues.email}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                              Phone:
                            </span>
                            <span>{watchedValues.phone}</span>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {(watchedValues.issues ||
                        watchedValues.dropOff ||
                        watchedValues.waitOnsite) && (
                        <AccordionItem value='additional'>
                          <AccordionTrigger className='text-base font-medium'>
                            Additional Information
                          </AccordionTrigger>
                          <AccordionContent className='space-y-2'>
                            {watchedValues.issues && (
                              <div>
                                <span className='text-muted-foreground'>
                                  Special Requests/Issues:
                                </span>
                                <p className='mt-1'>{watchedValues.issues}</p>
                              </div>
                            )}
                            {watchedValues.dropOff && (
                              <div className='flex items-center gap-2'>
                                <Checkbox checked disabled />
                                <span>Early drop-off requested</span>
                              </div>
                            )}
                            {watchedValues.waitOnsite && (
                              <div className='flex items-center gap-2'>
                                <Checkbox checked disabled />
                                <span>Customer will wait on-site</span>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      )}
                    </Accordion>

                    <div className='p-4 bg-yellow-50 rounded-lg flex items-start gap-2'>
                      <Info className='h-5 w-5 text-yellow-500 mt-0.5' />
                      <p className='text-sm'>
                        A service advisor will contact you to confirm your
                        appointment and provide any additional information.
                        Please note that the final cost may vary based on the
                        actual work required.
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

            {step < 6 ? (
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
                {isSubmitting ? "Submitting..." : "Book Service"}
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
                Service Booked!
              </CardTitle>
              <CardDescription className='text-center'>
                Your service appointment has been scheduled successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className='text-center space-y-4'>
              <p>
                We've sent a confirmation email to{" "}
                <span className='font-medium'>{watchedValues.email}</span> with
                all the details.
              </p>
              <p>
                A service advisor from {selectedLocation?.name} will contact you
                shortly to confirm your appointment.
              </p>
              <div className='p-4 bg-gray-50 rounded-lg mt-4'>
                <div className='flex justify-between mb-2'>
                  <span className='text-muted-foreground'>Service:</span>
                  <span className='font-medium'>{selectedService?.name}</span>
                </div>
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

              <div className='p-4 bg-blue-50 rounded-lg flex items-start gap-2 text-left'>
                <Wrench className='h-5 w-5 text-blue-500 mt-0.5' />
                <div className='text-sm'>
                  <p className='font-medium'>
                    What to bring to your appointment:
                  </p>
                  <ul className='list-disc list-inside mt-1 space-y-1'>
                    <li>Your motorcycle key</li>
                    <li>Proof of ownership (registration)</li>
                    <li>Service history (if available)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-center gap-4'>
              <Button
                onClick={() => (window.location.href = "/")}
                className='bg-red-600 hover:bg-red-700'
              >
                Return to Homepage
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  form.reset();
                }}
              >
                Book Another Service
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
