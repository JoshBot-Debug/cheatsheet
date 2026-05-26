# TODO

## Module 1: Low-Level Memory Architecture & Custom Allocators
### 1.1 Cache Locality & False Sharing
- [x] Study L1/L2/L3 cache line architecture (typically 64 bytes) and how data is fetched into cache blocks.

- [x] Understand the mechanics of False Sharing in multi-threaded environments (multiple cores modifying independent variables residing on the same cache line).

- [x] Learn how to use std::hardware_destructive_interference_size (C++17) to properly align structures and prevent false sharing.

### 1.2 Custom Memory Allocators
- [ ] Dive into the overhead of standard malloc/new (heap fragmentation, OS context switches) and why they fail in real-time loops.

- [ ] Implement an Arena / Stack Allocator (allocates linearly from a pre-allocated buffer; ideal for per-frame game loops).

- [ ] Implement a Pool Allocator (manages fixed-size blocks for O(1) allocation/deallocation without fragmentation).

- [ ] Write a custom C++ allocator class that is fully compliant with std::allocator_traits.

- [ ] Master Placement New: Learn how to construct an object directly into a pre-allocated memory buffer or memory-mapped IO register.

### 1.3 Virtual Memory & Huge Pages
- [x] Study the Translation Lookaside Buffer (TLB) and how hardware caches virtual-to-physical address translations.

- [ ] Deep dive into page faults (minor vs. major) and how they introduce latency spikes.

- [x] Explore Large/Huge Pages (2MB/1GB instead of the standard 4KB) and how they minimize TLB misses in memory-heavy or networking systems.

## Module 2: Low-Latency Concurrency & Multithreading
### 2.1 The C++ Memory Model & Atomics
- [ ] Master atomic operations via std::atomic and how they map to CPU instructions (e.g., LOCK prefix on x86).

- [ ] Study and map out the exact behaviors of C++ memory orderings:

memory_order_relaxed

memory_order_acquire & memory_order_release (Acquire-Release semantics)

memory_order_seq_cst (Sequentially Consistent - default)

- [ ] Build a Lock-Free Single-Producer Single-Consumer (SPSC) Queue using a lock-free atomic ring buffer.

### 2.2 Thread Management & Scheduling Mechanics
- [ ] Compare Spinlocks (busy-wait loops) vs. Mutexes/Condition Variables (blocking/putting threads to sleep via OS kernel). Identify the low-latency trade-offs.

- [ ] Learn how to apply CPU Thread Affinity to bind performance-critical threads (e.g., rendering thread, network polling loop) to specific CPU cores to eliminate context-switching overhead.

## Module 3: High-Performance Networking & Serialization
### 3.1 Async I/O Multiplexing & Architectures
- [ ] Study how event-driven, asynchronous I/O multiplexing engines function under the hood: epoll (Linux) and IOCP (Windows).

- [ ] Look into the event-driven design of Boost.Asio and explore modern Linux asynchronous I/O developments via io_uring.

### 3.2 Zero-Copy & Low-Latency Protocols
- [ ] Understand Zero-Copy Networking: Passing data directly from the Network Interface Card (NIC) ring buffers straight to user-space memory without middleman buffer copies.

- [ ] Analyze serialization bottlenecks caused by text formats (JSON/XML). Study flat, binary layout protocols like FlatBuffers (requires zero decoding/parsing time, heavily used in gaming) and Protocol Buffers.

- [ ] Study User-Space TCP/UDP: Understand why real-time multiplayer games almost exclusively rely on customized UDP protocols with selective reliability layers to bypass TCP's Head-of-Line (HoL) blocking.

## Module 4: Modern C++ Core Mechanics & Optimization
### 4.1 Object Life Cycle, Conversions & Semantics
- [ ] Study Explicit Constructors and how they block dangerous implicit down-casting and unintended type conversions.

- [ ] Implement Conversion Operators and learn how to use the explicit keyword on type conversions (explicit operator bool()).

- [ ] Deep dive into Move Semantics & Rvalue References: Write explicit move constructors and assignment operators to guarantee zero deep copies.

- [ ] Master perfect forwarding (std::forward) and study Return Value Optimization (RVO / NRVO) mechanics.

### 4.2 Compile-Time Systems & Architecture Patterns
- [ ] Move runtime calculations to compile-time using constexpr and consteval.

- [ ] Learn C++20 Concepts to constrain templates, improve compiler error messaging, and optimize compilation times.

- [ ] Master Templates & the Curiously Recurring Template Pattern (CRTP) to achieve static polymorphism (eliminating the runtime cost of virtual function tables).

- [ ] Review the encapsulation mechanics and trade-offs of friend methods and friend classes.

- [ ] Explore C++20 Ranges: Learn how to utilize range adapters, views, and lazy evaluation for composable, clean algorithmic expressions.

### 4.3 Type Erasure, Inlining & Predictability
- [ ] Analyze the performance overhead of Type Erasure: Compare std::function (which can cause unexpected heap allocations) against C++23's std::move_only_function and raw function pointers.

- [ ] Study inlining mechanics and branch prediction optimization using C++20's [[likely]] and [[unlikely]] attributes to avoid CPU pipeline stalls.

## Module 5: System Determinism & Embedded Constraints
### 5.1 Hard Hardware Constraints
- [ ] Master the correct usage of the volatile keyword in embedded environments (forcing memory-mapped I/O reads/writes to prevent compiler optimization).

- [ ] Clear up a massive interview trap: Verify why volatile is not a tool for multi-threaded synchronization or atomic concurrency in C++.

- [ ] Avoid atomic reference-counting overhead in performance-critical hot loops: Prefer std::unique_ptr or raw observer pointers over std::shared_ptr.

### 5.2 The Non-Exceptions Subset (-fno-exceptions)
- [ ] Understand how to handle systems code without relying on C++ exceptions (often disabled via -fno-exceptions in game engines like Unreal, or embedded toolchains).

- [ ] Master deterministic alternative error-handling primitives: std::optional and C++23's std::expected.

## Module 6: Data-Oriented Design (DOD) & System Patterns
### 6.1 Architectural Layout Shifts
- [ ] Transition from traditional Object-Oriented Programming (OOP) to Data-Oriented Design (DOD).

- [ ] Compare Array of Structs (AoS) vs. Struct of Arrays (SoA) layouts.

- [ ] Analyze how SoA structures drastically maximize cache line utilization, optimize data alignment, and unlock automatic vectorization (SIMD - Single Instruction Multiple Data).

### 6.2 Classical Software Design Patterns
- [ ] Review how traditional design patterns apply to low-level C++ (and their cache implications):

Creational: Factory Method, Abstract Factory, Singleton (and its thread-safe local-static implementation).

Structural: Adapter, Observer, Strategy, Decorator.

Behavioral & Systems: Command, Component Pattern, Data Locality/Flyweight patterns.

## Module 7: Core Computer Science Foundations
### 7.1 Data Structures & Algorithms (DSA) Essentials
- [ ] Master Big O Notation and algorithm complexity. Understand the crucial difference between worst-case complexity and Amortized Time (e.g., dynamic array/std::vector resizing behaviors).

- [ ] Implement Depth-First Search (DFS) tree and graph traversal strategies:

In-order traversal

Pre-order traversal

Post-order traversal

- [ ] Brush up on algorithmic techniques: Sliding Window, Two Pointers, Divide and Conquer, Greedy Algorithms, and Dynamic Programming.

### 7.2 Low-Level Representation & Number Systems
- [ ] Gain absolute comfort reading, converting, and mentally mapping different number bases:

Binary (Base-2)

Octal (Base-8)

Decimal (Base-10)

Hexadecimal (Base-16)

- [ ] Review bitwise operations (&, |, ^, ~, <<, >>) and bit-masking patterns.

## Module 8: Profiling, Diagnostics & Tooling
### 8.1 Microbenchmarking
- [ ] Learn how to write reliable microbenchmarks using frameworks like Google Benchmark.

- [ ] Understand how to keep the compiler from outsmarting your benchmarks (e.g., optimizing away loops or variables you are trying to test) using functions like benchmark::DoNotOptimize.

### 8.2 Sampling Profilers & Telemetry
- [ ] Practice profiling software to isolate cache misses, branch mispredictions, and CPU hotspots using sampling and instrumentation tools:

perf (Linux command-line profiling)

Intel VTune (Advanced hardware execution analysis)

Tracy Profiler (Real-time graphical frame and thread profiling)

Updated